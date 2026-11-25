var ah={speed:27,lift:0,tail:1.05},Po={speed:23,lift:.34,tail:1.35},Lo={speed:20,lift:.78,tail:2.05},Ts={speed:40,lift:.08,tail:4.15},No=26;function Do(i,e){let t=Math.min(1,e/i.aimDistance);return i.startY+(i.endY-i.startY)*t+4*i.lift*t*(1-t)}function rr(i,e,t){return t.x=i.startX+i.headingX*e,t.y=Do(i,e),t.z=i.startZ+i.headingZ*e,t}function It(i,e,t){let n=Math.max(0,Math.min(1,(i-e)/(t-e)));return n*n*(3-2*n)}function Uo(i){return Math.max(0,Math.min(1,(i-.3)/(.91-.3)))}var oh=(i,e,t)=>Math.min(t,Math.max(e,i)),Tn={bruiser:{crown:[4.91,0],name:"\u94C1\u62F3\u961F\u957F",skill:"\u9707\u6865\u91CD\u62F3",prompt:"\u91CD\u62F3\u84C4\u529B\uFF0C\u907F\u5F00\u62F3\u5370",color:"#ffc66c",height:4.5,aim:2.05,warm:.86,flight:.65,cooldown:6.3},diver:{crown:[3.74,-1.78],name:"\u6F6E\u94B3\u5DE8\u87F9",skill:"\u53CC\u94B3\u6F6E\u6C50",prompt:"\u53CC\u94B3\u5408\u51FB\uFF0C\u4E24\u9053\u6C34\u73AF\u4E4B\u95F4\u6709\u7A7A\u9699",color:"#39e4d5",height:2.32,aim:1.12,warm:.9,flight:.86,cooldown:6.3},warden:{crown:[3.47,-1.49],name:"\u91D1\u89D2\u91CD\u7280",skill:"\u94C1\u89D2\u51B2\u950B",prompt:"\u91CD\u7280\u538B\u4F4E\u4E86\u89D2\uFF0C\u95EA\u5F00\u91D1\u8272\u76F4\u9053",color:"#ffb847",height:2.84,aim:1.55,warm:1.12,flight:.82,cooldown:7.1},drill:{crown:[3.79,-1.65],name:"\u7D2B\u6676\u5730\u9F99",skill:"\u5730\u8109\u6676\u523A",prompt:"\u6676\u523A\u9010\u4E2A\u5192\u51FA\uFF0C\u79BB\u5F00\u7D2B\u5708",color:"#ce82ff",height:3.39,aim:1.6,warm:.89,flight:.52,cooldown:6.4},kestrel:{crown:[4.12,-2.03],name:"\u51B0\u7FFC\u98DE\u9F99",skill:"\u6781\u5BD2\u5410\u606F",prompt:"\u51B0\u9F99\u6B63\u5728\u5438\u6C14\uFF0C\u79BB\u5F00\u971C\u84DD\u6247\u5F62",color:"#78eaff",height:3.35,aim:1.92,warm:1.15,flight:.45,cooldown:6.5},engine:{crown:[3.72,-1.9],name:"\u7194\u7089\u86DB\u673A",skill:"\u7194\u82AF\u53CC\u70AE",prompt:"\u53CC\u70AE\u9501\u5B9A\uFF0C\u79BB\u5F00\u6A59\u7EA2\u843D\u70B9",color:"#ff8253",height:2.68,aim:1.33,warm:.94,flight:1.12,cooldown:6.8}},lh=(i,e)=>oh((i.age-i.warm-e.delay)/i.flight,0,1);function cd(i,e,t,n,s=0){if(e.shape==="circle")return Math.hypot(t-e.x,n-e.z)<e.radius+s;let r=e.x-i.x,a=e.z-i.z,o=Math.hypot(r,a)||1,c=((t-i.x)*r+(n-i.z)*a)/o,l=e.shape==="cone"?e.radius*oh(c/o,.05,1):e.radius;return c>-.1&&c<o+1.65+s&&Math.abs((t-i.x)*a-(n-i.z)*r)/o<l+s}function Jm(i){let e=i.boss,t=e.kind,n=Tn[t],s=i.x,r=i.captainZ,a=s>.7?-1:1,o=[],c=(l,h,f,u=0,d="circle")=>o.push({x:oh(l,-5.85,5.85),z:h,radius:f,delay:u,shape:d,hit:!1});return t==="diver"?(c(s-1.55,r,.96),c(s+1.55,r,.96,.13)):t==="warden"?c(e.x,r+.42,1.04,0,"strip"):t==="drill"?(c(s,r-.64,.89),c(s+a*.68,r+.07,.88,.26),c(s+a*1.45,r+.68,.91,.52)):t==="kestrel"?c(s,r+.74,1.31,0,"cone"):t==="engine"?(c(s,r-.17,1.12),c(s+a*2.42,r+.52,1.14,.37)):c(s,r-.44,1.16),e.skill={kind:t,x:e.x,z:e.z+.38,height:n.aim,age:0,warm:n.warm,flight:n.flight,marks:o,casualties:0,damagedCaptain:!1},i.notice(n.prompt),e.skill}function $m(i,e,t){let n=i.stage<7?2:3;if(i.event(e.kind+"Strike",t.x,.1,t.z),i.allies=i.allies.filter(s=>{if(e.casualties>=n||!cd(e,t,s.x,s.z,.12))return!0;let r=i.fall(s,"blue",.7,t.x);return r.vy=e.kind==="engine"?3.8:2.6,e.casualties++,!1}),!(e.damagedCaptain||!cd(e,t,i.x,i.captainZ,.16))){if(e.damagedCaptain=!0,i.buffs.shield>0){i.event("shieldHit",i.x,.6,i.captainZ);return}e.kind==="kestrel"&&(i.chill=1.6),!(i.hitGuard>0)&&(i.hurt=1,i.hitGuard=1.15,i.armor--,i.armor<=0&&(i.lossReason="signature",i.finish(!1)))}}function hd(i,e){let t=i.boss;if(!t.skill){t.nextCast-=e,t.z>=-26&&t.z<-5.2&&!i.activeGround.some(s=>s.finale&&!s.crossed&&Math.abs(s.z-t.z)<7)&&!t.vault&&!t.attackT&&t.nextCast<=0&&Jm(i);return}let n=t.skill;n.age+=e,!n.fired&&n.age>=n.warm&&(n.fired=!0,i.event(n.kind+"Cast",t.x,Tn[n.kind].aim,t.z+.37));for(let s of n.marks)if(!s.hit&&lh(n,s)>=1&&(s.hit=!0,$m(i,n,s),!i.playing))return;n.age>n.warm+n.flight+n.marks.at(-1).delay+.65&&(t.skill=null,t.nextCast=Tn[t.kind].cooldown)}var jm=i=>4.4*i,la=i=>["\u5DE6\u8DEF","\u4E2D\u8DEF","\u53F3\u8DEF"][i+1],ar={quay:{floor:"#c6bac1",joint:"#a699a6",line:"#8e7f8f",rim:"#fff2dc",deep:"#1e5368",glint:"#73b3b0",frame:"#517180"},timber:{floor:"#c69968",joint:"#956c49",line:"#785940",rim:"#ffe2a4",deep:"#28564e",glint:"#95bea0",frame:"#816448"},quarry:{floor:"#d4af8a",joint:"#ad8867",line:"#966d4d",rim:"#ffe9b1",deep:"#814e3f",glint:"#d99b68",frame:"#986f58"},forge:{floor:"#a0acb5",joint:"#728290",line:"#485f74",rim:"#f5cf83",deep:"#293b4e",glint:"#85afaf",frame:"#546a79"},ice:{floor:"#c2dce5",joint:"#94b8ce",line:"#769bb7",rim:"#f9ffff",deep:"#245779",glint:"#a5e7e7",frame:"#6e96ad"},cinder:{floor:"#a59aa3",joint:"#786d7c",line:"#675969",rim:"#ffd392",deep:"#512c3c",glint:"#fa9452",frame:"#6e5261"}},wt=(i,e,t=3.6)=>({kind:"gap",lane:i,at:e,length:t}),Dt=(i,e)=>({kind:"bridge",lane:i,at:e,length:4.4}),ft=(i,e,t="reserve")=>({kind:"cache",lane:i,at:e,reward:t}),Zt=(i,e)=>({kind:"coil",lane:i,at:e}),Kt=(i,e,t)=>({kind:"belt",lane:i,at:e,direction:t,length:8.2}),Qm=[["\u6E2F\u53E3\u5916\u6865","quay","bruiser",!1,[ft(-1,59,"squad")]],["\u65AD\u6728\u6808\u6865","timber","diver",!0,[wt(1,42),ft(-1,75,"engineer")]],["\u540A\u7D22\u7801\u5934","quay","warden",!1,[Dt(1,49),ft(-1,83,"medic")]],["\u91C7\u77F3\u5C94\u9053","quarry","drill",!1,[ft(1,37,"reserve"),wt(-1,65),Zt(0,94)]],["\u7ED3\u51B0\u7684\u8D27\u7EBF","ice","kestrel",!0,[Kt(-1,41,1),wt(1,69),ft(0,89,"frost")]],["\u94F8\u94C1\u8239\u575E","forge","engine",!1,[Zt(-1,39),Dt(1,68),ft(-1,96,"engineer")]],["\u6797\u95F4\u6D6E\u6865","timber","bruiser",!0,[wt(-1,35),ft(1,53,"engineer"),wt(1,82),Kt(0,104,-1)]],["\u76D0\u4ED3\u95F8\u53E3","quay","diver",!1,[ft(1,37,"medic"),Dt(-1,60),Zt(1,82),wt(0,105)]],["\u53CC\u58C1\u77FF\u5ECA","quarry","warden",!1,[ft(-1,35,"reserve"),ft(1,55,"frost"),wt(0,80),Dt(-1,105)]],["\u7089\u524D\u6025\u5F2F","cinder","drill",!0,[Kt(1,39,-1),Zt(0,61),Dt(-1,86),ft(1,107,"reserve")]],["\u51B0\u6CB3\u6E21\u53E3","ice","diver",!0,[wt(0,37),Dt(1,60),ft(-1,84,"engineer"),wt(-1,107)]],["\u94A2\u6881\u63A5\u529B","forge","warden",!1,[Kt(0,34,1),ft(1,53,"medic"),Dt(-1,77),Zt(0,106)]],["\u6811\u6D77\u6551\u63F4","timber","kestrel",!1,[ft(-1,33,"medic"),wt(1,58),Kt(0,80,-1),ft(-1,105,"reserve")]],["\u6F6E\u6C50\u53CC\u95F8","quay","engine",!0,[Dt(-1,36),Zt(1,54),Dt(1,81),ft(0,108,"frost")]],["\u788E\u77F3\u8FD0\u6CB3","quarry","drill",!0,[Zt(1,35),wt(-1,57),ft(0,78,"engineer"),wt(1,99),Kt(-1,116,1)]],["\u7070\u70EC\u8F6C\u8FD0\u7AD9","cinder","bruiser",!1,[Kt(-1,38,1),ft(0,52,"reserve"),Zt(1,75),Dt(-1,97),wt(1,119)]],["\u971C\u955C\u5F2F\u6865","ice","kestrel",!0,[Kt(0,35,-1),wt(1,55),ft(-1,73,"engineer"),Kt(1,93,-1),wt(0,116),ft(-1,138,"reserve")]],["\u91CD\u9524\u88C5\u914D\u7EBF","forge","engine",!1,[ft(1,36,"frost"),Kt(-1,55,1),Dt(1,75),Zt(0,98),ft(-1,121,"reserve")]],["\u60AC\u6728\u8D27\u67B6","timber","warden",!0,[Dt(1,37),wt(-1,56),ft(0,79,"medic"),wt(1,101),Zt(-1,123)]],["\u706F\u5854\u591C\u822A","quay","diver",!0,[Zt(0,34),ft(-1,54,"engineer"),Dt(1,77),Kt(0,96,1),wt(-1,120)]],["\u6DF1\u4E95\u6298\u8FD4","quarry","drill",!1,[wt(1,37),Kt(0,56,-1),ft(-1,78,"frost"),Dt(1,102),Zt(0,123)]],["\u7089\u6E23\u957F\u5824","cinder","engine",!0,[ft(-1,35,"reserve"),Dt(1,54),Zt(-1,74),Kt(0,94,-1),wt(1,119)]],["\u51B0\u810A\u53CC\u7D22","ice","warden",!1,[Dt(-1,34),ft(1,52,"engineer"),wt(0,72),Dt(1,94),wt(-1,124),ft(-1,143,"squad")]],["\u98CE\u8F6E\u5DE5\u573A","forge","kestrel",!0,[Kt(1,35,-1),Zt(0,55),Kt(-1,75,1),ft(1,95,"medic"),Dt(0,121)]],["\u6797\u8C37\u6700\u540E\u4E00\u8DE8","timber","diver",!0,[wt(-1,34),ft(1,52,"engineer"),Dt(0,72),wt(1,93),Zt(-1,114),ft(1,134,"reserve")]],["\u5916\u6E2F\u5C01\u9501\u7EBF","quay","bruiser",!1,[ft(1,35,"reserve"),Dt(-1,55),Kt(0,75,1),Zt(1,95),Dt(1,115),wt(-1,134)]],["\u8FDE\u9501\u77FF\u4E95","quarry","drill",!0,[Zt(-1,33),ft(0,51,"frost"),wt(1,72),Kt(-1,91,1),Dt(1,112),ft(-1,132,"medic")]],["\u6781\u591C\u51B0\u5824","ice","kestrel",!0,[wt(1,33),Kt(-1,51,1),Dt(0,73),ft(-1,92,"engineer"),wt(0,114),Kt(1,136,-1)]],["\u7EA2\u7089\u4E09\u7EBF","forge","warden",!1,[Dt(1,35),Zt(-1,53),ft(0,73,"reserve"),wt(-1,93),Dt(0,114),Zt(1,135)]],["\u7194\u5FC3\u7EC8\u6865","cinder","engine",!0,[ft(-1,34,"engineer"),wt(1,52),Dt(-1,72),Zt(0,91),Kt(1,110,-1),Dt(1,132),ft(-1,151,"medic")]]],ca=Qm.map(([i,e,t,n,s],r)=>({number:r+1,name:i,theme:e,boss:t,vault:n,features:s,finale:202+r*3+[0,8,3,12,5][r%5],restEvery:[44,40,48,42,46][r%5],restLength:5.1+[.4,1.2,.15,.7,1.1][r%5]})),Qi=ca.length;function Fo(i,e){let t=Math.round((i.kind==="cache"?60:i.kind==="bridge"?42:29)+(e-1)*1.15);return{...i,x:jm(i.lane),z:-i.at,hp:t,maxHp:t,state:"ready",age:0,flash:0,half:i.kind==="cache"?1.67:.74,depth:i.kind==="cache"?.38:.34}}function As(i){return i.kind==="gap"&&i.state!=="repaired"||i.kind==="bridge"&&i.state==="cut"}function Oo(i,e,t,n=0){return As(i)&&Math.abs(e-i.x)<4.4/2-.14-n&&Math.abs(t-i.z)<i.length/2-n}var Pn={plus:{label:"+3",hp:10,count:3,tone:"blue"},squad:{label:"+5",hp:39,count:5,tone:"blue"},merge:{label:"\u70AE+5",hp:45,tone:"gold"},rapid:{label:"\u8FDE\u5C04",hp:35,tone:"gold"},shield:{label:"\u62A4\u76FE",hp:41,tone:"blue"},blast:{label:"\u7206\u7834",hp:44,tone:"gold"},plasma:{label:"\u7535\u6D46",hp:45,tone:"blue"},spread:{label:"\u53CC\u53D1",hp:41,tone:"gold"},drone:{label:"\u652F\u63F4",hp:45,tone:"blue"},reserve:{label:"+6",hp:38,count:6,tone:"blue"},engineer:{label:"\u67B6\u6865",hp:35,tone:"gold"},medic:{label:"\u6551\u63F4",hp:30,tone:"blue"},frost:{label:"\u51B0\u5E55",hp:37,tone:"blue"},fever:{label:"\u72C2\u70ED",hp:48,tone:"gold"}};function ch(i,e,t,n){let s=Pn[t].hp+(t==="plus"?Math.min(8,n-1):(n-1)*1.05);return{x:i,at:e,z:-e,type:t,hp:s,maxHp:s,active:!0,flash:0}}function ud(i){let e=[];function t(a,o,c){e.push(ch(a,o,c,i))}t(0,11,"plus");let n=["merge","blast","rapid","merge","spread","engineer","fever","merge"],s=["squad","shield","squad","plasma","medic","drone","reserve","frost"],r=i-1;for(let a=0;a<15;a++)t(-4.65,16+a*13.2,n[a===0?0:(a+r)%n.length]),t(4.05,24+a*13.2,s[a===0?0:(a+r)%s.length]);return e}var Bo=(i,e,t)=>Math.max(e,Math.min(t,i)),eg=new Set(["cache","bridge","coil"]);function tg(i,e,t){let n=ch(e.x,i.distance-e.z+.85,t,i.stage);n.z=i.distance-n.at,i.gates.push(n),i.event("supplyBreak",e.x,.65,n.z)}function fd(i,e,t){if(e.state==="ready"){if(e.hp=Math.max(0,e.hp-t.damage),e.flash=1,e.hp>0){i.event("wallHit",t.x,.65,t.z,.55);return}if(e.age=0,e.kind==="cache")e.state="open",i.event("wallBreak",e.x,.57,e.z),tg(i,e,e.reward);else if(e.kind==="bridge")e.state="cut",i.event("chainSnap",e.x,.85,e.z),i.notice(la(e.lane)+"\u540A\u6865\u5DF2\u843D\uFF0C\u589E\u63F4\u88AB\u622A\u65AD");else if(e.kind==="coil"){e.state="discharged",i.event("discharge",e.x,.5,e.z,1.35);let n=s=>{s.alive&&Math.abs(s.z-e.z)<7&&Math.abs(s.x-e.x)<5.1&&i.kill(s,.9,e.x)};for(let s of i.columns)for(let r of s.units)n(r);for(let s of i.runners)n(s);i.boss.active&&!i.boss.defeated&&Math.abs(i.boss.z-e.z)<6&&Math.abs(i.boss.x-e.x)<5&&i.damageBoss(t,24)}}}function dd(i){let e=i.boss,t=i.bossStride,n=Math.max(4,(-23-e.z)*t/(2.3+t)),s=Fo({kind:"gap",lane:0,length:4,at:i.distance-e.z-n-3},i.stage);s.z=i.distance-s.at,s.finale=!0,i.features.push(s)}function pd(i,e){i.activeGround.length=0;for(let t of i.features)if(t.z=i.distance-t.at,t.age+=e,t.flash=Math.max(0,t.flash-e*6),!(t.z<i.entryZ-12||t.z>15)){if((t.kind==="bridge"||t.kind==="gap"||t.kind==="belt")&&i.activeGround.push(t),!t.warned&&t.z>-22&&t.z<-14&&t.state==="ready"&&!t.finale){t.warned=!0;let n=la(t.lane),s={gap:n+"\u65AD\u6865\uFF0C\u63D0\u524D\u6362\u9053",bridge:"\u6253\u65AD"+n+"\u540A\u7D22\uFF0C\u622A\u4F4F\u589E\u63F4",cache:"\u6253\u788E"+n+"\u7816\u5899\uFF0C\u53D6\u51FA\u8865\u7ED9",coil:"\u51FB\u4E2D"+n+"\u7EBF\u5708\uFF0C\u653E\u7535\u6E05\u5175",belt:n+"\u4F20\u9001\u5E26\u5411"+(t.direction>0?"\u53F3":"\u5DE6")};i.notice(s[t.kind])}if(eg.has(t.kind)&&(t.target??(t.target={mechanism:t}),t.target.x=t.x,t.target.z=t.z+(t.kind==="bridge"?t.length/2+.24:0)),!t.escorted&&t.kind==="cache"&&t.z>=i.entryZ-5&&t.z<-8){t.escorted=!0;for(let n=0;n<2;n++)for(let s=-1;s<=1;s++){let r=i.grunt(t.x+s*.48,i.entryZ-.95-n*.59);r.speed=1.57,i.runners.push(r)}}if(t.kind==="bridge"&&t.state==="ready"&&t.z>=-7.1&&(t.state="linked",t.age=0,i.flanks.push({x:t.lane===0?4.44:t.x,remaining:16+Math.floor(i.stage/3),next:0}),i.notice(la(t.lane)+"\u540A\u6865\u63A5\u901A\uFF0C\u589E\u63F4\u6765\u4E86")),t.kind==="belt"&&Math.abs(t.z-i.captainZ)<t.length/2&&Math.abs(i.x-t.x)<4.4/2-.1&&!i.rope&&i.aim(i.targetX+t.direction*e*1.32),As(t)&&i.planks&&t.z>-5.2&&t.z<1&&Math.abs(i.x-t.x)<4.4/2+.2&&!i.rope&&(i.planks--,t.state="repaired",t.age=0,i.event("plus",t.x,.24,t.z),i.notice(la(t.lane)+"\u5DF2\u642D\u597D\u4FBF\u6865")),As(t)&&Math.abs(t.z)<t.length/2+2.8&&(i.allies=i.allies.filter(n=>{if(!Oo(t,n.x,n.z,.14))return!0;let s=i.fall(n,"blue",0);return s.intoGap=!0,s.vy=-.5,!1}),!i.rope&&Oo(t,i.x,i.captainZ,.22))){if(i.armor--,i.hurt=1,i.armor<=0){i.lossReason="gap",i.finish(!1);return}let n=t.lane===-1?1:t.lane===1?-1:i.x>=t.x?1:-1;i.rope={age:0,from:i.x,to:t.x+n*(4.4/2+.75)},i.aim(i.rope.to),i.hitGuard=1.05,i.notice("\u5B89\u5168\u7EF3\u62C9\u56DE\u961F\u957F\uFF0C\u62A4\u7532 \u22121")}}for(let t of i.flanks)if(t.next-=e,t.remaining>0&&t.next<=0){t.next+=.16,t.remaining--;let n=i.grunt(t.x+(t.remaining%3-1)*.12,i.entryZ-.92);n.speed=1.65,n.flank=!0,i.runners.push(n)}i.flanks=i.flanks.filter(t=>t.remaining>0)}function md(i,e,t){e.lift=0;for(let n of i.activeGround){let s=e.z-n.z;if(n.kind==="belt"&&Math.abs(s)<n.length/2&&Math.abs(e.x-n.x)<4.4/2){e.x=Bo(e.x+n.direction*t*.65,-6,6);continue}if(!As(n)||s<-n.length/2-4.3||s>n.length/2+.45||Math.abs(e.x-n.x)>4.4/2+.16)continue;if(e.role==="vault"){let o=Bo((s+n.length/2+.55)/(n.length+1.1),0,1);e.lift=1.08*Math.sin(Math.PI*o);return}let r=n.lane===-1?1:n.lane===1||e.laneX<n.x?-1:1,a=n.x+r*(4.4/2+.24);if(e.x+=Bo(a-e.x,-3.8*t,3.8*t),Oo(n,e.x,e.z,.22)){e.alive=!1;let o=i.fall(e,"red",0);o.intoGap=!0,o.vy=-.7}return}}function gd(i,e){let t=i.boss;t.vault={piece:e,t:0,from:t.z-e.z,to:e.length/2+1.08},t.attackT=0,t.recovery=.15,e.crossed=!0}function xd(i,e){let t=i.boss,n=t.vault;n.airDash&&(n.piece.z+=i.worldAdvance),n.t+=e;let s=Bo((n.t-.21)/.89,0,1),r=s*s*(3-2*s);t.z=n.piece.z+n.from+(n.to-n.from)*r,t.lift=2.5*4*s*(1-s),n.t>=1.1&&!n.landed&&(n.landed=!0,i.event("vaultLand",t.x,.06,t.z,.9)),n.t>=1.35&&(t.vault=null,t.lift=0,t.recovery=.34)}var xn=(i,e,t)=>Math.max(e,Math.min(t,i)),ko=Math.PI*2,_d=21,vd=5.45,ng=1.38,ha=11,ig=.435,sg=-2.65,rg=.515,zo=1.22,hh=11;function uh(i,e){let t=0,n=i,s=8;for(;n>=s;)n-=s,t++,s=8+6*t;let r=ko*n/s+.21+t*.18,a=.93+(e-1)*.46+t*.51;return[Math.cos(r)*a,Math.sin(r)*a*.92]}var Ho=class{constructor(e=()=>{}){this.emit=e,this.reset()}reset(e=1){this.stage=xn(Math.trunc(Number(e))||1,1,Qi),this.route=ca[this.stage-1],this.features=this.route.features.map(s=>Fo(s,this.stage)),this.activeGround=[],this.flanks=[],this.rope=null,this.planks=0,this.overrun=null,this.chill=0,this.hint=null,this.hintSequence=0,this.rallyZ=-100,this.seed=129920+(this.stage-1)*1141,this.sequence=0,this.phase="ready",this.elapsed=0,this.distance=0,this.captainZ=0,this.targetZ=0,this.caught=!1,this.lossReason=null,this.worldAdvance=0,this.x=0,this.targetX=this.x,this.velocity=0,this.upgrades=0,this.scale=1,this.visualScale=1,this.recoil=0,this.mergeGlow=0,this.hurt=0,this.armor=3,this.shots=[],this.incoming=[],this.enemyFireTimer=0,this.allies=[],this.falling=[],this.deliveries=[],this.runners=[],this.rocketTimer=.18,this.volleyTimer=.06,this.volley=0,this.buffs={rapid:0,shield:0,plasma:0,spread:0,drone:0,fever:0,frost:0},this.supportTimer=0,this.feverMeter=0,this.row=0,this.toNextRow=0,this.entryZ??(this.entryZ=-46),this.finaleRow=this.route.finale,this.lastRow=this.finaleRow+48,this.hitGuard=0,this.score=0,this.recruits=0,this.endTime=0;let t=72+(this.stage-1)*2.1;this.wall={x:4.13,z:-_d,hp:t,maxHp:t,flash:0};let n=365+(this.stage-1)*27;this.boss={x:-.42,z:this.entryZ-1.4,hp:n,maxHp:n,marched:0,hit:0,lift:0,active:!1,defeated:!1,removed:!1,skill:null,nextCast:0,kind:this.route.boss,vault:null,moveClock:0,special:0,pattern:0,brace:0,defeatAge:0,attackT:0,impactDone:!1,recovery:0,leapFromX:0,leapFromZ:0,landX:0,landZ:0},this.gates=ud(this.stage).filter(s=>!this.features.some(r=>Math.abs(s.x-r.x)<2.6&&Math.abs(s.at-r.at)<(r.length||3.6)/2+2.1)),this.bossStride=1.02+Math.min(.27,(this.stage-1)*.014),this.columns=Array.from({length:ha},(s,r)=>{let a=sg+r*ig;return{x:a,minX:a-.18,maxX:a+.18,index:r,units:[]}}),this.recruit(this.x,!0)}rand(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}grunt(e,t){let n=e+(this.rand()-.5)*.16;return{x:n,laneX:n,z:t+(this.rand()-.5)*.08,id:++this.sequence,phase:this.rand()*ko,marched:0,yaw:0,size:.92+this.rand()*.13,alive:!0}}event(e,t,n,s,r=1){this.emit({kind:e,x:t,y:n,z:s,strength:r})}notice(e){this.hint={id:++this.hintSequence,text:e}}start(){this.phase==="ready"&&(this.phase="run")}aim(e,t=this.targetZ){this.targetZ=xn(t,0,ng),this.targetX=xn(e,-vd,vd)}get playing(){return this.phase==="run"||this.phase==="boss"||this.phase==="clear"}get cannonDamage(){return 26+this.upgrades*5+Math.round((this.stage-1)*.88)}nextSlot(){let e=new Set(this.allies.map(n=>n.slot));for(let n of this.deliveries)n.slot!=null&&e.add(n.slot);let t=0;for(;e.has(t);)t++;return t}recruit(e,t=!1,n=this.nextSlot()){if(this.allies.length>=48)return;let[s,r]=uh(n,this.scale);this.allies.push({slot:n,x:xn(e+s,-6.28,6.28),z:this.captainZ+r,age:t?2:0,phase:this.rand()*ko}),t||this.recruits++}openCard(e){if(!e.active)return;if(e.active=!1,e.collectedAt=this.elapsed,e.pop=0,this.event("supplyBreak",e.x,.62,e.z),e.type==="blast"){let n=xn(e.x,-1.8,1);this.blast({x:n,power:5.8},e.z-1.5),this.boss.active&&Math.hypot(this.boss.x-n,this.boss.z-e.z+1.5)<4.6&&this.damageBoss({kind:"rocket"},48);return}let t=Pn[e.type].count;for(let n=0;n<(t||1);n++){let s=t?this.nextSlot():null;if(s!=null&&s>=48)break;this.deliveries.push({type:e.type,slot:s,sx:e.x,sz:e.z,x:e.x,z:e.z,y:.46,age:-n*.065,progress:0,phase:this.rand()*ko})}}updateDeliveries(e){for(let t of this.deliveries){if(t.age+=e,t.age<0)continue;let n=Math.min(1,t.age/.58),s=n*(2-n),[r,a]=t.slot==null?[0,-.18]:uh(t.slot,this.scale);if(t.progress=n,t.x=t.sx+(xn(this.x+r,-6.28,6.28)-t.sx)*s,t.z=t.sz+(this.captainZ+a-t.sz)*s,t.y=.46*(1-n)+Math.sin(Math.PI*n)*(1.05+Math.min(1.25,Math.abs(t.sz)*.075)),!(n<1))if(t.slot!=null)this.recruit(this.x,!1,t.slot),this.event("plus",t.x,.12,t.z,.7);else{if(t.type==="merge")this.upgrades++,this.scale=1+Math.min(.64,this.upgrades*.13);else if(t.type==="engineer")this.planks=Math.min(2,this.planks+1),this.notice("\u4FBF\u6865 +1\uFF0C\u9760\u8FD1\u7F3A\u53E3\u81EA\u52A8\u67B6\u6865");else if(t.type==="medic"){this.armor=Math.min(3,this.armor+1);for(let o=0;o<2;o++)this.recruit(this.x);this.notice("\u6551\u63F4\u5230\u961F\uFF0C\u62A4\u7532 +1")}else{let o=t.type==="fever"?4.2:t.type==="shield"?5:6;this.buffs[t.type]=o}this.mergeGlow=1,this.event("merge",this.x,.23,this.captainZ)}}this.deliveries=this.deliveries.filter(t=>t.progress<1)}crossGates(){for(let e of this.gates){if(e.z=this.distance-e.at,!e.active){e.pop=this.elapsed-e.collectedAt;continue}this.caught||Math.abs(e.z-this.captainZ)>.83||Math.abs(this.x-e.x)<=1.06+this.scale*.25&&this.openCard(e)}}marchPastBoss(e,t){let n=this.boss,s=e.z-n.z;if(!e.passSide&&e.x===e.laneX&&(s<-3.3||s>6.4))return;let r=n.attackT>0?n.landZ:n.z+.45,a=1-It(Math.abs(s),1.45,3.25),o=n.attackT>0?1-It(Math.abs(e.z-r),1.25,3.45):0,c=Math.max(1.42*a,1.9*o*It(n.attackT,0,.31));if(c?e.passSide||(e.passSide=e.x<n.x?-1:1):e.passSide=0,!c&&e.x===e.laneX)return;let l=e.passSide||1,h=l>0?2.09-n.x:n.x+3.05,f=xn(Math.abs(e.laneX-n.x)/h,0,1),u=e.laneX+l*c*(1-f);e.x+=(u-e.x)*(1-Math.exp(-9*t)),!c&&Math.abs(e.x-e.laneX)<.002&&(e.x=e.laneX)}spawnRow(){let e=Math.floor(this.row/hh),t=this.row%hh;for(let n of this.columns){let s=e%2?n.index:ha-1-n.index;if(this.row<4&&(n.index<2||n.index>8)||t<2&&s>8)continue;let r=(this.row%2-.5)*.12,a=n.units[n.units.length-1],o=this.entryZ-.8-.09*(n.index%2),c=a?Math.min(o,a.z-.37):o,l=this.grunt(n.x+r,c);if(t===5&&n.index===e*7%ha&&this.stage>=2){let h=["gunner"];this.stage>=3&&h.push("weaver","brute","vault"),this.stage>=4&&h.push("guard"),this.stage>=5&&h.push("bomber","standard"),this.stage>=7&&h.push("courier"),l.role=h[(e+this.stage)%h.length];let f=l.role==="brute"||l.role==="guard";l.size*=f?1.42:1.1,l.hp=f?9+this.stage*.65:3.2+this.stage*.27,l.speed=f?.92:l.role==="weaver"?1.69:1.32,this.runners.push(l)}else t===2&&(n.index===e*3%ha||n.index===(e*3+5)%ha)?(l.speed=1.72+this.rand()*.21,this.runners.push(l)):n.units.push(l)}this.row++}moveGrunt(e,t,n){let s=e.speed>1.6,r=!e.spent&&e.z>=this.captainZ+(s?-6.7:-5.75)&&e.z<this.captainZ+1.65,a=e.x,o=e.speed??zo,c=0;if(r){let h=this.x,f=this.captainZ,u=Math.abs(h-e.x);for(let m of n){let g=Math.abs(m.x-e.x);g<u&&(u=g,h=m.x,f=m.z)}o*=s?1.48:1.32;let d=Math.max(.075,(f-e.z-.32)/(this.worldAdvance/t+o)),p=s?12.2:11.6,x=(e.id%7-3)*.065;c=xn((h+x-e.x)/d,-p,p)*t,e.role==="weaver"&&(c+=Math.sin(e.phase+e.marched*7)*t*.74),e.x+=c}else if(e.spent)e.overX!=null&&(e.x+=xn(e.overX-e.x,-3.3*t,3.3*t));else if(this.boss.active&&!this.boss.defeated){let h=e.x;this.marchPastBoss(e,t),c=e.x-h}if(this.activeGround.length?md(this,e,t):e.lift=0,!e.alive)return;this.buffs.frost>0&&(o*=.48,e.x=a+(e.x-a)*.6),Math.abs(e.z-this.rallyZ)<2.7&&(o*=1.17),c=e.x-a;let l=o*t;e.z+=this.worldAdvance+l,e.marched+=Math.hypot(l,c),e.yaw+=(Math.atan2(c,l)-e.yaw)*(1-Math.exp(-9*t)),e.role==="gunner"&&!e.fired&&e.z>=-14&&e.z<-4&&this.enemyFireTimer<=0&&(this.enemyRound(e.x,e.z,.65,0,e),e.fired=!0),!e.spent&&e.z>this.captainZ-2&&e.z<this.captainZ+2.3&&this.contact(e)}advanceCrowd(e){this.rallyZ=this.runners.find(n=>n.alive&&n.role==="standard"&&n.z>-10)?.z??-100;let t=this.allies.filter(n=>n.z<=this.captainZ+.18);for(let n of this.columns){n.minX=n.x-.19,n.maxX=n.x+.19;let s=0,r=!1;for(let a of n.units)a.alive&&(this.moveGrunt(a,e,t),!(!a.alive||a.z>10)&&(n.minX=Math.min(n.minX,a.x),n.maxX=Math.max(n.maxX,a.x),s&&n.units[s-1].z<a.z&&(r=!0),n.units[s++]=a));n.units.length=s,r&&n.units.sort((a,o)=>o.z-a.z)}for(let n of this.runners)n.alive&&this.moveGrunt(n,e,t);for(this.runners=this.runners.filter(n=>n.alive&&n.z<10),this.toNextRow-=this.worldAdvance+zo*e;this.row<this.lastRow&&this.toNextRow<=0;)this.spawnRow(),this.toNextRow+=rg+(this.row%hh===0?.38:0),this.row>=70&&Math.abs(this.row-this.finaleRow)>10&&(this.row-70)%this.route.restEvery===0&&(this.toNextRow+=this.route.restLength)}contact(e){if(!this.playing||this.caught)return;let t=this.allies.findIndex(r=>Math.abs(r.x-e.x)<.32&&Math.abs(r.z-e.z)<.32),n=Math.abs(e.x-this.x)<.39*this.scale&&Math.abs(e.z-this.captainZ)<.4;if(t<0&&!n)return!1;let s=e.startZ!=null;if(s||e.role==="bomber"?e.alive=!1:(e.spent=!0,e.overX=t>=0?this.allies[t].x:this.x),this.hitGuard>0)return!0;if(this.hitGuard=this.buffs.shield>0?.46:1.26-Math.min(.21,this.stage*.007),this.buffs.shield>0)return this.event("shieldHit",e.x,.35,e.z),!0;if(this.hurt=1,e.role==="bomber")return this.event("impact",e.x,.1,e.z,.87),this.allies=this.allies.filter(r=>Math.hypot(r.x-e.x,r.z-e.z)>.95?!0:(this.fall(r,"blue",1.2,e.x),!1)),n&&!this.allies.length&&--this.armor<=0&&(this.lossReason="infantry",this.finish(!1,e)),!0;if(t<0&&this.allies.length){let r=1/0;this.allies.forEach((a,o)=>{let c=(a.x-e.x)**2+(a.z-e.z)**2;c<r&&(r=c,t=o)})}if(t>=0){let r=this.allies.splice(t,1)[0],a=this.fall(r,"blue",0);a.prone=!0,a.dir=r.x>=e.x?1:-1,s||(e.overX=r.x,e.overBody=a)}else--this.armor<=0&&(this.lossReason=s&&e.shooter===this.boss?"bossShot":"infantry",this.finish(!1,s?e.shooter:e));return!0}enemyRound(e,t,n,s=0,r=this.boss){let o=this.x+s-e,c=Math.max(1,this.captainZ-t),l=Math.hypot(o,c);this.incoming.push({x:e,z:t,y:n,startY:n,startZ:t,shooter:r,vx:o*7.4/l,vz:c*7.4/l,alive:!0}),this.enemyFireTimer=1.35,this.event("hostileMuzzle",e,n,t)}advanceIncoming(e){this.enemyFireTimer=Math.max(0,this.enemyFireTimer-e);for(let t of this.incoming)t.x+=t.vx*e,t.z+=t.vz*e,t.y=.45+(t.startY-.45)*xn(t.z/t.startZ,0,1),t.z>this.captainZ-2&&t.z<this.captainZ+2.3&&this.contact(t)&&this.event("hostileMuzzle",t.x,t.y,t.z);this.incoming=this.incoming.filter(t=>t.alive&&t.z<6)}pushWall(e,t=this.wall,n=2.14){let s=(r,a,o)=>t.hp>0&&Math.abs(r-t.x)<n+o&&Math.abs(a-t.z)<.32+o;this.allies=this.allies.filter(r=>{if(!s(r.x,r.z,.19))return!0;this.fall(r,"blue",0);let a=this.falling[this.falling.length-1];return a.pushed=!0,a.front=t.z+.55,!1}),!this.caught&&s(this.x,this.captainZ,.32*this.visualScale)&&(this.caught=!0,this.caughtBy=t),this.caught&&this.caughtBy===t&&(this.captainZ=Math.max(this.captainZ,t.z+.38),this.captainZ>=4.5&&(this.lossReason="wall",this.finish(!1)))}fall(e,t,n,s=e.x){if(this.falling.length>=96){let a=this.falling.findIndex(o=>o.side==="red");this.falling.splice(a<0?0:a,1)}let r={x:e.x,z:e.z,y:.07,t:0,side:t,phase:e.phase||0,size:e.size||1,id:e.id||0,vx:(e.x-s)*1.05+(this.rand()-.5)*2.8*n,vz:(this.rand()-.5)*2.4*n,vy:(1.65+this.rand()*2.3)*n,spin:(this.rand()-.5)*8,roll:(this.rand()-.5)*7};return this.falling.push(r),r}kill(e,t=1,n=e.x){if(!(!e.alive||e.overBody&&e.z<e.overBody.z+.84)&&(e.alive=!1,this.score++,this.buffs.fever<=0&&(this.feverMeter+=.21,this.feverMeter>=100&&(this.feverMeter=0,this.buffs.fever=4.2,this.event("merge",this.x,.2,this.captainZ))),this.fall(e,"red",t,n),e.role==="courier"&&this.playing)){let s={x:e.x,z:e.z,type:"medic",active:!0};this.openCard(s)}}closeEnemy(e,t){let s=null,r=(a,o)=>{let c=t-a.z;c<0||c>2.35+o||Math.hypot(a.x-e,c)>2.35+o||(!s||a.z>s.z||a.z===s.z&&Math.abs(a.x-e)<Math.abs(s.x-e))&&(s=a)};this.boss.active&&!this.boss.defeated&&r(this.boss,.78);for(let a of this.columns)if(!(a.maxX<e-2.35-.25||a.minX>e+2.35+.25))for(let o of a.units){if(o.z<t-2.35-.25)break;o.alive&&r(o,.2)}for(let a of this.runners)a.alive&&r(a,.2);return s}launch(e,t,n,s,r,a,o=0){let c=1/Math.hypot(1,o),l={kind:s===Lo?"rocket":"shot",profile:s,power:r,damage:a,headingX:o*c,headingZ:-c,startX:e,startY:t,startZ:n,x:e,y:t,z:n,distance:0,range:No,age:0,afterHit:0,finished:!1,pierce:s===Ts?3:0},h=this.firstHit(l,No);if(o===0&&(!h||h.distance>2.35)){let u=this.closeEnemy(e,n);if(u){let d=u.x-e,p=Math.min(-.06,u.z-n),x=Math.hypot(d,p);l.headingX=d/x,l.headingZ=p/x,l.range=Math.min(No,x+.75),h=this.firstHit(l,l.range)}}l.aimDistance=Math.max(.12,h?h.distance:l.range),l.endY=h?.target===this.boss?Tn[this.boss.kind].aim:h?.target===this.wall||h?.target.type||h?.target.mechanism?.72:.48;let f=(this.boss.z-n)/l.headingZ;s===Lo&&this.boss.active&&!this.boss.defeated&&f>0&&f<l.range&&Math.abs(e+l.headingX*f-this.boss.x)<=1.26&&h?.target!==this.wall&&!h?.target.type&&!h?.target.mechanism&&(l.aimDistance=Math.max(.12,f),l.endY=Tn[this.boss.kind].aim),l.lift=s.lift*Math.min(1,l.aimDistance/9),this.shots.push(l)}shoot(e){let t=this.buffs.fever>0,n=(t?.62:this.buffs.rapid>0?.72:1)*(this.chill>0?1.32:1);if(this.rocketTimer-=e,this.rocketTimer<=0){this.rocketTimer+=.69*n,this.recoil=1;let s=this.x+.295*this.visualScale,r=1.31*this.visualScale,a=this.captainZ-.6*this.visualScale,o=1+Math.min(1.7,this.upgrades*.28);this.launch(s,r,a,Lo,o,this.cannonDamage),this.event("muzzle",s,r,a,o)}if(this.volleyTimer-=e,this.volleyTimer<=0){this.volleyTimer+=.27*n,this.volley++;for(let s of this.allies){if(s.age<.12)continue;let r=s.x+.13,a=s.z-.22,o=(t||this.buffs.plasma>0)&&(s.slot+this.volley)%3===0,c=o?Ts:s.slot%4===1?Po:ah;this.launch(r,.58,a,c,1,o?6:2.8),(t||this.buffs.spread>0)&&s.slot%2===0&&this.launch(r,.58,a,ah,1,2.8,(this.volley%2?1:-1)*.09)}this.allies.length&&this.event("smallShot",this.x,.6,0,.7)}if(this.supportTimer-=e,this.buffs.drone>0&&this.supportTimer<=0){this.supportTimer=.36;for(let s of[-1,1])this.launch(this.x+s*1.15,1.3,this.captainZ-.32,Ts,1,6)}}firstHit(e,t){let n=e.headingX,s=e.headingZ,r=e.x+n*t,a=e.z+s*t,o=e.kind==="rocket"?.15:.07,c=null,l=(h,f,u)=>{if(h.overBody&&h.z<h.overBody.z+.84)return;let d=f+o,p=u+o,x=Math.max(0,(h.z+p-e.z)/s),m=Math.min(t,(h.z-p-e.z)/s);if(Math.abs(n)<1e-6){if(Math.abs(e.x-h.x)>d)return}else{let g=(h.x-d-e.x)/n,_=(h.x+d-e.x)/n;x=Math.max(x,Math.min(g,_)),m=Math.min(m,Math.max(g,_))}if(!(x>m||c&&x>=c.distance)){if(e.aimDistance!==void 0&&h!==this.wall&&!h.type&&!h.mechanism){let g=h.lift||0,_=g+(h===this.boss?Tn[h.kind].height:.92*(h.size||1))+o,y=Do(e,e.distance+x),M=Do(e,e.distance+m);if(Math.min(y,M)>_||Math.max(y,M)<g-o)return;y>_&&y>M&&(x+=(m-x)*(y-_)/(y-M))}c={target:h,distance:x}}};this.wall.hp>0&&l(this.wall,2.1,.32);for(let h of this.features)h.target&&h.state==="ready"&&h.target.z>=a-.7&&h.target.z<=e.z+.7&&l(h.target,h.half,h.depth);for(let h of this.gates)h.active&&h.z>=a-.36&&h.z<=e.z+.36&&l(h,Pn[h.type].tone==="gold"?1.22:.9,.15);this.boss.active&&!this.boss.defeated&&l(this.boss,1.26,.7);for(let h of this.columns)if(!(h.maxX<Math.min(e.x,r)-.42||h.minX>Math.max(e.x,r)+.42))for(let f of h.units){if(f.z<a-.42)break;f.alive&&f.z<e.z+.42&&l(f,.245,.23)}for(let h of this.runners)h.alive&&l(h,.25*h.size,.23*h.size);return c}blast(e,t){let n=.95+e.power*.48;for(let s of this.columns)if(!(s.maxX<e.x-n||s.minX>e.x+n))for(let r of s.units){if(r.z<t-n)break;r.alive&&(r.x-e.x)**2+(r.z-t)**2<n*n&&this.kill(r,1.18,e.x)}for(let s of this.runners)s.alive&&(s.x-e.x)**2+(s.z-t)**2<n*n&&this.kill(s,1.18,e.x);this.event("impact",e.x,.06,t,e.power)}damageBoss(e,t){let n=this.boss;n.defeated||(n.hp=Math.max(0,n.hp-t*(n.brace>.6?.55:1)),n.hit=e.kind==="rocket"?.77:Math.max(n.hit,.1),n.hp<=0&&(n.defeated=!0,n.skill=null,n.defeatAge=0,this.phase="clear",this.event("finisher",n.x,2.3,n.z,1.5)))}resolveHit(e,t){if(t.mechanism){fd(this,t.mechanism,e);return}if(t===this.wall)t.hp=Math.max(0,t.hp-e.damage*.72),t.flash=1,this.event(t.hp<=0?"wallBreak":"wallHit",e.x,.85,e.z,e.kind==="rocket"?1.15:.45);else if(t.type&&Pn[t.type])t.hp=Math.max(0,t.hp-e.damage),t.flash=1,t.hp<=0?this.openCard(t):this.event("cardHit",e.x,.6,e.z,.7);else if(t===this.boss)this.event(e.kind==="rocket"?"impact":"hit",e.x,e.y,e.z,e.kind==="rocket"?e.power*.7:.7),this.damageBoss(e,e.damage);else if(e.kind==="rocket"){this.blast(e,t.z);let n=this.boss;n.active&&n.lift<.85&&Math.hypot(e.x-n.x,t.z-n.z)<1.65+e.power*.48&&this.damageBoss(e,e.damage*.65)}else t.hp!=null&&(t.hp-=e.damage*(t.role==="guard"&&e.profile!==Ts?.65:1)),(t.hp==null||t.hp<=0)&&this.kill(t,.72),this.event("hit",e.x,.45,e.z,.65)}advanceShots(e){let t=[];for(let n of this.shots){if(n.age+=e,n.finished){n.afterHit+=e,n.afterHit*n.profile.speed<n.profile.tail&&t.push(n);continue}let s=Math.min(e*n.profile.speed,n.range-n.distance);for(;s>0&&!n.finished&&this.playing;){let r=this.firstHit(n,s),a=r?r.distance:s;n.distance+=a,!r&&n.range-n.distance<1e-8&&(n.distance=n.range),s-=a,rr(n,n.distance,n),r&&this.resolveHit(n,r.target);let o=r&&n.pierce>0&&r.target.alive===!1;o&&n.pierce--,n.finished=!!r&&!o||n.distance>=n.range-1e-8}if(!this.playing)break;t.push(n)}this.shots=this.playing?t:[]}updateFalling(e){for(let t of this.falling){if(t.prone){t.t+=e,t.z+=this.worldAdvance;continue}if(t.intoGap){t.t+=e,t.vy-=e*8,t.y+=t.vy*e,t.z+=this.worldAdvance;continue}if(t.pushed){t.z=Math.max(t.z,t.front),t.z+=this.worldAdvance,t.y=0,t.z>7&&(t.t=2);continue}t.t+=e,t.x+=t.vx*e,t.z+=t.vz*e+this.worldAdvance*.38,t.y+=t.vy*e,t.vy-=(t.gravity??8.6)*e,t.y<.05&&(t.y=.05,t.vx*=.9,t.vz*=.9)}this.falling=this.falling.filter(t=>t.t<(t.prone?this.overrun?4.9:2.1:1.02))}slamSquad(){let e=this.boss;if(this.event("slam",e.landX,.08,e.landZ,1.08),this.allies=this.allies.filter(t=>{let n=t.x-e.landX,s=t.z-e.landZ,r=Math.hypot(n,s);if(r>2.15+.19)return!0;let a=this.fall(t,"blue",0),o=r>.01?Math.atan2(s,n):t.phase,c=3+2.1*(1-Math.min(1,r/2.15));return a.vx=Math.cos(o)*c,a.vz=Math.sin(o)*c,a.vy=4+c*.38,a.gravity=13.5,a.spin=-Math.sin(o)*5,a.roll=Math.cos(o)*5,!1}),!(Math.hypot(this.x-e.landX,this.captainZ-e.landZ)>2.15+.26)){if(this.buffs.shield>0){this.buffs.shield=0,this.event("shieldHit",this.x,.7,this.captainZ);return}this.hurt=1,this.hitGuard=1.15,this.armor--,this.armor<=0&&(this.lossReason="slam",this.finish(!1))}}advanceBoss(e){let t=this.boss;if(t.defeated){let l=t.defeatAge;t.defeatAge+=e,l<.92&&t.defeatAge>=.92&&this.landBoss(),t.removed||(t.z+=this.worldAdvance),l<1.62&&t.defeatAge>=1.62&&(t.removed=!0,this.event("bossBurst",t.x,.62,t.z-1.15,1.4)),t.removed&&t.defeatAge>2.05&&!this.flanks.length&&this.row>=this.lastRow&&!this.runners.length&&this.columns.every(h=>h.units.length===0)&&this.finish(!0);return}if(!t.active){this.row>=this.finaleRow&&(t.z=this.entryZ-1.5,t.active=!0,this.phase="boss",this.route.vault&&dd(this));return}if(hd(this,e),!this.playing)return;if(t.vault){xd(this,e);return}if(t.recovery=Math.max(0,t.recovery-e),t.attackT>0){t.attackT+=e;let l=Uo(t.attackT),h=It(l,0,1);t.x=t.leapFromX+(t.landX-t.leapFromX)*h,t.z=t.leapFromZ+(t.landZ-.68-t.leapFromZ)*h,t.lift=2.15*4*l*(1-l),t.attackT>=.91&&!t.impactDone&&(t.impactDone=!0,this.slamSquad()),t.attackT>=1.48&&(t.attackT=0,t.recovery=.92);return}for(let l of this.activeGround){if(l.crossed||!As(l)||Math.abs(t.x-l.x)>1.9)continue;let h=l.z-l.length/2-t.z;if(h<=1.05&&h>=-.5){gd(this,l);return}}t.moveClock+=e;let n=t.moveClock%5.2;t.brace=t.kind==="warden"?It(n,.92,1.32)*(1-It(n,2.45,2.95)):0,t.special=t.kind==="drill"?It(n,1.1,1.55)*(1-It(n,2.35,2.85)):0;let s=t.skill?.kind==="warden"&&t.skill.fired&&!t.skill.marks[0].hit?2.2:0,r=e*this.bossStride*(1-.38*t.brace+.78*t.special+s);if(t.z+=this.worldAdvance+r,t.marched+=r,t.kind==="kestrel"&&t.z>-11&&t.z<-7&&!t.glided&&!t.skill){t.glided=!0,t.vault={piece:{z:t.z+2},from:-2,to:2.1,t:0,airDash:!0};return}if(t.z>4.5){this.lossReason="breach",this.finish(!1);return}if(t.x=xn(t.x+xn(this.x-t.x,-e*.9,e*.9),-1.13,-.1),t.recovery>0||t.z<-4.8||t.skill)return;let a=null,o=3.65,c=(l,h)=>{if(h<t.z-.2)return;let f=Math.hypot(l-t.x,h-t.z);f<o&&(o=f,a={x:l,z:h})};c(this.x,this.captainZ);for(let l of this.allies)c(l.x,l.z);a&&(t.leapFromX=t.x,t.leapFromZ=t.z,t.landX=xn(a.x,-1.13,-.1),t.landZ=xn(a.z,t.z+.68,t.z+2.8),t.attackT=.001,t.impactDone=!1)}landBoss(){this.event("victory",this.boss.x,.1,this.boss.z-1.35,1.05)}finish(e,t=null){if(this.playing&&(this.phase=e?"won":"lost",this.endTime=0,this.shots=[],this.incoming=[],!e))if(this.event("loss",this.x,0,this.captainZ),this.lossReason==="infantry"){let n=t?.alive&&t.id?t:null;if(!n){let s=r=>{!r.alive||r.z>this.captainZ+.36||(!n||Math.hypot(r.x-this.x,r.z-this.captainZ)<Math.hypot(n.x-this.x,n.z-this.captainZ))&&(n=r)};for(let r of this.columns)for(let a of r.units)s(a);this.runners.forEach(s)}n||(n=this.grunt(this.x,this.entryZ-1),this.runners.push(n)),this.overrun={x:this.x,z:this.captainZ,crossed:!1,attacker:n.id,approach:Math.max(2.35,(this.captainZ-n.z+1.6)/4)};for(let s of this.allies){let r=this.fall(s,"blue",0);r.prone=!0,r.dir=s.x>=this.x?1:-1}this.allies=[]}else this.event("impact",this.x,0,this.captainZ,1.25)}advanceOverrun(e){let t=this.overrun;this.worldAdvance=.36*e,this.distance+=this.worldAdvance,this.captainZ+=this.worldAdvance,t.z=this.captainZ,this.wall.z+=this.worldAdvance;for(let s of this.gates)s.z+=this.worldAdvance;for(let s of this.features)s.z+=this.worldAdvance;let n=s=>{if(!s.alive||s.z>10)return;let r=s.id===t.attacker,a=(r?Math.max((s.speed||zo)*1.68,t.approach):(s.speed||zo)*1.68)*e,o=0;if((r||s.z>t.z-7)&&s.z<t.z+.46){let l=s.id===t.attacker?0:(s.id%7-3)*.15,h=r?11:4.9;o=xn(t.x+l-s.x,-h*e,h*e),s.x+=o}r&&Math.abs(s.x-t.x)>.43&&s.z<t.z+.48&&(a=Math.min(a,Math.max(0,t.z+.15-s.z)));let c=s.z;s.z+=a+this.worldAdvance,s.marched+=Math.hypot(o,a),s.yaw+=(Math.atan2(o,a)-s.yaw)*(1-Math.exp(-8*e)),c<t.z+1.05&&s.z>=t.z+1.05&&Math.abs(s.x-t.x)<1.15&&(t.crossed=!0)};for(let s of this.columns)for(let r of s.units)n(r);this.runners.forEach(n)}get resultReady(){return this.boss.defeated&&this.boss.defeatAge<2.05?!1:this.overrun?this.overrun.crossed&&this.endTime>=2.5:this.endTime>.86}tick(e,t=0,n=0){if(this.worldAdvance=0,!this.playing){(this.phase==="won"||this.phase==="lost")&&(this.endTime+=e,this.overrun&&this.advanceOverrun(e),this.phase==="lost"&&this.boss.defeated&&this.boss.defeatAge<2.05&&this.advanceBoss(e),this.boss.hit=Math.max(0,this.boss.hit-4*e),this.updateFalling(e));return}this.elapsed+=e,this.chill=Math.max(0,this.chill-e);for(let a of Object.keys(this.buffs))this.buffs[a]=Math.max(0,this.buffs[a]-e);for(let a of this.gates)a.flash=Math.max(0,a.flash-e*7);this.hitGuard=Math.max(0,this.hitGuard-e),this.hurt=Math.max(0,this.hurt-4*e),this.mergeGlow=Math.max(0,this.mergeGlow-2.25*e),this.recoil=Math.max(0,this.recoil-5.1*e),this.wall.flash=Math.max(0,this.wall.flash-4.6*e),this.boss.hit=Math.max(0,this.boss.hit-5.4*e),this.visualScale+=(this.scale-this.visualScale)*(1-Math.exp(-8*e)),(t||n)&&this.aim(this.targetX+t*10.2*e,this.targetZ+n*3.1*e),this.caught||(this.captainZ+=(this.targetZ-this.captainZ)*(1-Math.exp(-16*e)));let s=this.x;if(this.rope){let a=this.rope;a.age+=e,this.x=a.from+(a.to-a.from)*It(a.age,0,.58),a.age>=.58&&(this.rope=null,this.aim(a.to))}else this.caught||(this.x+=(this.targetX-this.x)*(1-Math.exp(-21*e)));this.velocity=(this.x-s)/Math.max(e,.001);let r=this.boss.active?2.3:3.65;if(this.worldAdvance=r*e,this.distance+=this.worldAdvance,this.wall.z=this.distance-_d,pd(this,e),!!this.playing){this.crossGates(),this.updateDeliveries(e);for(let a of this.allies){a.age+=e;let[o,c]=uh(a.slot,this.scale),l=xn(this.x+o,-6.28,6.28);a.x+=(l-a.x)*(1-Math.exp(-19*e)),a.z+=(this.captainZ+c-a.z)*(1-Math.exp(-14*e))}this.pushWall(e);for(let a of this.features)a.kind==="cache"&&a.state==="ready"&&a.z>-4&&a.z<11&&this.pushWall(e,a,a.half);this.playing&&(this.advanceCrowd(e),this.advanceIncoming(e),this.updateFalling(e),this.playing&&(this.advanceBoss(e),this.playing&&(this.caught||this.shoot(e),this.advanceShots(e))))}}};var fp=0,eu=1,dp=2;var ao=1,pp=2,Gr=3,vi=0,In=1,Ht=2,qs=0,Vr=1,tu=2,nu=3,iu=4,mp=5;var Ys=100,gp=101,xp=102,_p=103,vp=104,yp=200,Mp=201,bp=202,Sp=203,su=204,ru=205,Ep=206,wp=207,Tp=208,Ap=209,Rp=210,Cp=211,Ip=212,Pp=213,Lp=214,_l=0,vl=1,yl=2,br=3,Ml=4,bl=5,Sl=6,El=7,oo=0,Np=1,Dp=2,yi=0,au=1,ou=2,lu=3,cu=4,hu=5,uu=6,fu=7,zh="attached",Up="detached",du=300,Zs=301,Wr=302,Zl=303,Kl=304,mi=1e3,Yn=1001,Sr=1002,Xt=1003,Jl=1004;var Ks=1005;var qt=1006,Xr=1007;var Un=1008;var Fn=1009,pu=1010,mu=1011,qr=1012,$l=1013,ai=1014,Wn=1015,oi=1016,jl=1017,Ql=1018,Js=1020,gu=35902,xu=35899,_u=1021,vu=1022,Kn=1023,Fi=1026,qi=1027,ec=1028,tc=1029,ps=1030,nc=1031;var ic=1033,lo=33776,co=33777,ho=33778,uo=33779,sc=35840,rc=35841,ac=35842,oc=35843,lc=36196,cc=37492,hc=37496,uc=37488,fc=37489,fo=37490,dc=37491,pc=37808,mc=37809,gc=37810,xc=37811,_c=37812,vc=37813,yc=37814,Mc=37815,bc=37816,Sc=37817,Ec=37818,wc=37819,Tc=37820,Ac=37821,Rc=36492,Cc=36494,Ic=36495,Pc=36283,Lc=36284,po=36285,Nc=36286;var Ds=2300,Us=2301,gl=2302,kh=2303,Hh=2400,Gh=2401,Vh=2402,Fp=2500;var yu=0,mo=1,Yr=2,Op=3200;var Zr=0,Bp=1,Yi="",xt="srgb",Rn="srgb-linear",wa="linear",Tt="srgb";var xl=7680;var zp=519,kp=512,Hp=513,Gp=514,Mu=515,Vp=516,Wp=517,bu=518,Su=519,Eu=35044,Xn=35048;var wu="300 es",Zn=2e3,Er=2001;function ag(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function og(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function wr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Xp(){let i=wr("canvas");return i.style.display="block",i}var yd={},Tr=null;function Ta(...i){let e="THREE."+i.shift();Tr?Tr("log",e,...i):console.log(e,...i)}function qp(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Oe(...i){i=qp(i);let e="THREE."+i.shift();if(Tr)Tr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ke(...i){i=qp(i);let e="THREE."+i.shift();if(Tr)Tr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ns(...i){let e=i.join(" ");e in yd||(yd[e]=!0,Oe(...i))}function Yp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Zp={[_l]:_l,[yl]:Sl,[Ml]:Ml,[br]:bl,[vl]:vl,[Sl]:yl,[El]:El,[bl]:br},gi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},_n=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Md=1234567,Ma=Math.PI/180,Fs=180/Math.PI;function li(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(_n[i&255]+_n[i>>8&255]+_n[i>>16&255]+_n[i>>24&255]+"-"+_n[e&255]+_n[e>>8&255]+"-"+_n[e>>16&15|64]+_n[e>>24&255]+"-"+_n[t&63|128]+_n[t>>8&255]+"-"+_n[t>>16&255]+_n[t>>24&255]+_n[n&255]+_n[n>>8&255]+_n[n>>16&255]+_n[n>>24&255]).toLowerCase()}function ot(i,e,t){return Math.max(e,Math.min(t,i))}function Tu(i,e){return(i%e+e)%e}function lg(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function cg(i,e,t){return i!==e?(t-i)/(e-i):0}function ba(i,e,t){return(1-t)*i+t*e}function hg(i,e,t,n){return ba(i,e,1-Math.exp(-t*n))}function ug(i,e=1){return e-Math.abs(Tu(i,e*2)-e)}function fg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function dg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function pg(i,e){return i+Math.floor(Math.random()*(e-i+1))}function mg(i,e){return i+Math.random()*(e-i)}function gg(i){return i*(.5-Math.random())}function xg(i){i!==void 0&&(Md=i);let e=Md+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function _g(i){return i*Ma}function vg(i){return i*Fs}function yg(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Mg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Au(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function bg(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),f=r((e-n)/2),u=a((e-n)/2),d=r((n-e)/2),p=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*f,c*u,o*l);break;case"YZY":i.set(c*u,o*h,c*f,o*l);break;case"ZXZ":i.set(c*f,c*u,o*h,o*l);break;case"XZX":i.set(o*h,c*p,c*d,o*l);break;case"YXY":i.set(c*d,o*h,c*p,o*l);break;case"ZYZ":i.set(c*p,c*d,o*h,o*l);break;default:Oe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Dc(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Ru(i,e){if(e.constructor===Float32Array)return i;let t=Dc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function Cu(i,e){if(e.constructor===Float32Array)return i;let t=Dc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var $e={DEG2RAD:Ma,RAD2DEG:Fs,generateUUID:li,clamp:ot,euclideanModulo:Tu,mapLinear:lg,inverseLerp:cg,lerp:ba,damp:hg,pingpong:ug,smoothstep:fg,smootherstep:dg,randInt:pg,randFloat:mg,randFloatSpread:gg,seededRandom:xg,degToRad:_g,radToDeg:vg,isPowerOfTwo:yg,ceilPowerOfTwo:Mg,floorPowerOfTwo:Au,setQuaternionFromProperEuler:bg,normalize:Cu,denormalize:Ru},Uu=class Uu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Uu.prototype.isVector2=!0;var ae=Uu,en=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3],u=r[a+0],d=r[a+1],p=r[a+2],x=r[a+3];if(f!==x||c!==u||l!==d||h!==p){let m=c*u+l*d+h*p+f*x;m<0&&(u=-u,d=-d,p=-p,x=-x,m=-m);let g=1-o;if(m<.9995){let _=Math.acos(m),y=Math.sin(_);g=Math.sin(g*_)/y,o=Math.sin(o*_)/y,c=c*g+u*o,l=l*g+d*o,h=h*g+p*o,f=f*g+x*o}else{c=c*g+u*o,l=l*g+d*o,h=h*g+p*o,f=f*g+x*o;let _=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=_,l*=_,h*=_,f*=_}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=r[a],u=r[a+1],d=r[a+2],p=r[a+3];return e[t]=o*p+h*f+c*d-l*u,e[t+1]=c*p+h*u+l*f-o*d,e[t+2]=l*p+h*d+o*u-c*f,e[t+3]=h*p-o*f-c*u-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),f=o(r/2),u=c(n/2),d=c(s/2),p=c(r/2);switch(a){case"XYZ":this._x=u*h*f+l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f-u*d*p;break;case"YXZ":this._x=u*h*f+l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f+u*d*p;break;case"ZXY":this._x=u*h*f-l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f-u*d*p;break;case"ZYX":this._x=u*h*f-l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f+u*d*p;break;case"YZX":this._x=u*h*f+l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f-u*d*p;break;case"XZY":this._x=u*h*f-l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f+u*d*p;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],f=t[10],u=n+o+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>o&&n>f){let d=2*Math.sqrt(1+n-o-f);this._w=(h-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>f){let d=2*Math.sqrt(1+o-n-f);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+f-n-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Fu=class Fu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+c*l+a*f-o*h,this.y=n+c*h+o*l-r*f,this.z=s+c*f+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fh.copy(this).projectOnVector(e),this.sub(fh)}reflect(e){return this.sub(fh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Fu.prototype.isVector3=!0;var N=Fu,fh=new N,bd=new en,Ou=class Ou{constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],f=n[7],u=n[2],d=n[5],p=n[8],x=s[0],m=s[3],g=s[6],_=s[1],y=s[4],M=s[7],w=s[2],b=s[5],v=s[8];return r[0]=a*x+o*_+c*w,r[3]=a*m+o*y+c*b,r[6]=a*g+o*M+c*v,r[1]=l*x+h*_+f*w,r[4]=l*m+h*y+f*b,r[7]=l*g+h*M+f*v,r[2]=u*x+d*_+p*w,r[5]=u*m+d*y+p*b,r[8]=u*g+d*M+p*v,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=h*a-o*l,u=o*c-h*r,d=l*r-a*c,p=t*f+n*u+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return e[0]=f*x,e[1]=(s*l-h*n)*x,e[2]=(o*n-s*a)*x,e[3]=u*x,e[4]=(h*t-s*c)*x,e[5]=(s*r-o*t)*x,e[6]=d*x,e[7]=(n*c-l*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Ns("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(dh.makeScale(e,t)),this}rotate(e){return Ns("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(dh.makeRotation(-e)),this}translate(e,t){return Ns("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(dh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Ou.prototype.isMatrix3=!0;var Je=Ou,dh=new Je,Sd=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ed=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Sg(){let i={enabled:!0,workingColorSpace:Rn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Tt&&(s.r=Ui(s.r),s.g=Ui(s.g),s.b=Ui(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Tt&&(s.r=Mr(s.r),s.g=Mr(s.g),s.b=Mr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Yi?wa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Rn]:{primaries:e,whitePoint:n,transfer:wa,toXYZ:Sd,fromXYZ:Ed,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:xt},outputColorSpaceConfig:{drawingBufferColorSpace:xt}},[xt]:{primaries:e,whitePoint:n,transfer:Tt,toXYZ:Sd,fromXYZ:Ed,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:xt}}}),i}var ht=Sg();function Ui(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Mr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var or,wl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{or===void 0&&(or=wr("canvas")),or.width=e.width,or.height=e.height;let s=or.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=or}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=wr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ui(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ui(t[n]/255)*255):t[n]=Ui(t[n]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Eg=0,Ar=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Eg++}),this.uuid=li(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ph(s[a].image)):r.push(ph(s[a]))}else r=ph(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function ph(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?wl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}var wg=0,mh=new N,tn=class i extends gi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Yn,s=Yn,r=qt,a=Un,o=Kn,c=Fn,l=i.DEFAULT_ANISOTROPY,h=Yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wg++}),this.uuid=li(),this.name="",this.source=new Ar(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(mh).x}get height(){return this.source.getSize(mh).y}get depth(){return this.source.getSize(mh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==du)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case mi:e.x=e.x-Math.floor(e.x);break;case Yn:e.x=e.x<0?0:1;break;case Sr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case mi:e.y=e.y-Math.floor(e.y);break;case Yn:e.y=e.y<0?0:1;break;case Sr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=du;tn.DEFAULT_ANISOTROPY=1;var Bu=class Bu{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],f=c[8],u=c[1],d=c[5],p=c[9],x=c[2],m=c[6],g=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-x)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+x)<.1&&Math.abs(p+m)<.1&&Math.abs(l+d+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,M=(d+1)/2,w=(g+1)/2,b=(h+u)/4,v=(f+x)/4,S=(p+m)/4;return y>M&&y>w?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=b/n,r=v/n):M>w?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=b/s,r=S/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=v/r,s=S/r),this.set(n,s,r,t),this}let _=Math.sqrt((m-p)*(m-p)+(f-x)*(f-x)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(m-p)/_,this.y=(f-x)/_,this.z=(u-h)/_,this.w=Math.acos((l+d+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Bu.prototype.isVector4=!0;var _t=Bu,Tl=class extends gi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new tn({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ar(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},kn=class extends Tl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Aa=class extends tn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Al=class extends tn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Yl=class Yl{constructor(e,t,n,s,r,a,o,c,l,h,f,u,d,p,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,f,u,d,p,x,m)}set(e,t,n,s,r,a,o,c,l,h,f,u,d,p,x,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=f,g[14]=u,g[3]=d,g[7]=p,g[11]=x,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Yl().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/lr.setFromMatrixColumn(e,0).length(),r=1/lr.setFromMatrixColumn(e,1).length(),a=1/lr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let u=a*h,d=a*f,p=o*h,x=o*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=d+p*l,t[5]=u-x*l,t[9]=-o*c,t[2]=x-u*l,t[6]=p+d*l,t[10]=a*c}else if(e.order==="YXZ"){let u=c*h,d=c*f,p=l*h,x=l*f;t[0]=u+x*o,t[4]=p*o-d,t[8]=a*l,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=d*o-p,t[6]=x+u*o,t[10]=a*c}else if(e.order==="ZXY"){let u=c*h,d=c*f,p=l*h,x=l*f;t[0]=u-x*o,t[4]=-a*f,t[8]=p+d*o,t[1]=d+p*o,t[5]=a*h,t[9]=x-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let u=a*h,d=a*f,p=o*h,x=o*f;t[0]=c*h,t[4]=p*l-d,t[8]=u*l+x,t[1]=c*f,t[5]=x*l+u,t[9]=d*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let u=a*c,d=a*l,p=o*c,x=o*l;t[0]=c*h,t[4]=x-u*f,t[8]=p*f+d,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=d*f+p,t[10]=u-x*f}else if(e.order==="XZY"){let u=a*c,d=a*l,p=o*c,x=o*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=u*f+x,t[5]=a*h,t[9]=d*f-p,t[2]=p*f-d,t[6]=o*h,t[10]=x*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Tg,e,Ag)}lookAt(e,t,n){let s=this.elements;return Bn.subVectors(e,t),Bn.lengthSq()===0&&(Bn.z=1),Bn.normalize(),ns.crossVectors(n,Bn),ns.lengthSq()===0&&(Math.abs(n.z)===1?Bn.x+=1e-4:Bn.z+=1e-4,Bn.normalize(),ns.crossVectors(n,Bn)),ns.normalize(),Vo.crossVectors(Bn,ns),s[0]=ns.x,s[4]=Vo.x,s[8]=Bn.x,s[1]=ns.y,s[5]=Vo.y,s[9]=Bn.y,s[2]=ns.z,s[6]=Vo.z,s[10]=Bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],f=n[5],u=n[9],d=n[13],p=n[2],x=n[6],m=n[10],g=n[14],_=n[3],y=n[7],M=n[11],w=n[15],b=s[0],v=s[4],S=s[8],D=s[12],I=s[1],O=s[5],G=s[9],Y=s[13],P=s[2],U=s[6],H=s[10],L=s[14],K=s[3],B=s[7],R=s[11],C=s[15];return r[0]=a*b+o*I+c*P+l*K,r[4]=a*v+o*O+c*U+l*B,r[8]=a*S+o*G+c*H+l*R,r[12]=a*D+o*Y+c*L+l*C,r[1]=h*b+f*I+u*P+d*K,r[5]=h*v+f*O+u*U+d*B,r[9]=h*S+f*G+u*H+d*R,r[13]=h*D+f*Y+u*L+d*C,r[2]=p*b+x*I+m*P+g*K,r[6]=p*v+x*O+m*U+g*B,r[10]=p*S+x*G+m*H+g*R,r[14]=p*D+x*Y+m*L+g*C,r[3]=_*b+y*I+M*P+w*K,r[7]=_*v+y*O+M*U+w*B,r[11]=_*S+y*G+M*H+w*R,r[15]=_*D+y*Y+M*L+w*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],f=e[6],u=e[10],d=e[14],p=e[3],x=e[7],m=e[11],g=e[15],_=c*d-l*u,y=o*d-l*f,M=o*u-c*f,w=a*d-l*h,b=a*u-c*h,v=a*f-o*h;return t*(x*_-m*y+g*M)-n*(p*_-m*w+g*b)+s*(p*y-x*w+g*v)-r*(p*M-x*b+m*v)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(r*h-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=e[9],u=e[10],d=e[11],p=e[12],x=e[13],m=e[14],g=e[15],_=t*o-n*a,y=t*c-s*a,M=t*l-r*a,w=n*c-s*o,b=n*l-r*o,v=s*l-r*c,S=h*x-f*p,D=h*m-u*p,I=h*g-d*p,O=f*m-u*x,G=f*g-d*x,Y=u*g-d*m,P=_*Y-y*G+M*O+w*I-b*D+v*S;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/P;return e[0]=(o*Y-c*G+l*O)*U,e[1]=(s*G-n*Y-r*O)*U,e[2]=(x*v-m*b+g*w)*U,e[3]=(u*b-f*v-d*w)*U,e[4]=(c*I-a*Y-l*D)*U,e[5]=(t*Y-s*I+r*D)*U,e[6]=(m*M-p*v-g*y)*U,e[7]=(h*v-u*M+d*y)*U,e[8]=(a*G-o*I+l*S)*U,e[9]=(n*I-t*G-r*S)*U,e[10]=(p*b-x*M+g*_)*U,e[11]=(f*M-h*b-d*_)*U,e[12]=(o*D-a*O-c*S)*U,e[13]=(t*O-n*D+s*S)*U,e[14]=(x*y-p*w-m*_)*U,e[15]=(h*w-f*y+u*_)*U,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,f=o+o,u=r*l,d=r*h,p=r*f,x=a*h,m=a*f,g=o*f,_=c*l,y=c*h,M=c*f,w=n.x,b=n.y,v=n.z;return s[0]=(1-(x+g))*w,s[1]=(d+M)*w,s[2]=(p-y)*w,s[3]=0,s[4]=(d-M)*b,s[5]=(1-(u+g))*b,s[6]=(m+_)*b,s[7]=0,s[8]=(p+y)*v,s[9]=(m-_)*v,s[10]=(1-(u+x))*v,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=lr.set(s[0],s[1],s[2]).length(),o=lr.set(s[4],s[5],s[6]).length(),c=lr.set(s[8],s[9],s[10]).length();r<0&&(a=-a),ei.copy(this);let l=1/a,h=1/o,f=1/c;return ei.elements[0]*=l,ei.elements[1]*=l,ei.elements[2]*=l,ei.elements[4]*=h,ei.elements[5]*=h,ei.elements[6]*=h,ei.elements[8]*=f,ei.elements[9]*=f,ei.elements[10]*=f,t.setFromRotationMatrix(ei),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=Zn,c=!1){let l=this.elements,h=2*r/(t-e),f=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s),p,x;if(c)p=r/(a-r),x=a*r/(a-r);else if(o===Zn)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Er)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Zn,c=!1){let l=this.elements,h=2/(t-e),f=2/(n-s),u=-(t+e)/(t-e),d=-(n+s)/(n-s),p,x;if(c)p=1/(a-r),x=a/(a-r);else if(o===Zn)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===Er)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Yl.prototype.isMatrix4=!0;var We=Yl,lr=new N,ei=new We,Tg=new N(0,0,0),Ag=new N(1,1,1),ns=new N,Vo=new N,Bn=new N,wd=new We,Td=new en,$t=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],f=s[2],u=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ot(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ot(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Td.setFromEuler(this),this.setFromQuaternion(Td,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};$t.DEFAULT_ORDER="XYZ";var Ra=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Rg=0,Ad=new N,cr=new en,Ci=new We,Wo=new N,ua=new N,Cg=new N,Ig=new en,Rd=new N(1,0,0),Cd=new N(0,1,0),Id=new N(0,0,1),Pd={type:"added"},Pg={type:"removed"},hr={type:"childadded",child:null},gh={type:"childremoved",child:null},Pt=class i extends gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rg++}),this.uuid=li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new N,t=new $t,n=new en,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new We},normalMatrix:{value:new Je}}),this.matrix=new We,this.matrixWorld=new We,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ra,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return cr.setFromAxisAngle(e,t),this.quaternion.multiply(cr),this}rotateOnWorldAxis(e,t){return cr.setFromAxisAngle(e,t),this.quaternion.premultiply(cr),this}rotateX(e){return this.rotateOnAxis(Rd,e)}rotateY(e){return this.rotateOnAxis(Cd,e)}rotateZ(e){return this.rotateOnAxis(Id,e)}translateOnAxis(e,t){return Ad.copy(e).applyQuaternion(this.quaternion),this.position.add(Ad.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Rd,e)}translateY(e){return this.translateOnAxis(Cd,e)}translateZ(e){return this.translateOnAxis(Id,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ci.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Wo.copy(e):Wo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ua.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ci.lookAt(ua,Wo,this.up):Ci.lookAt(Wo,ua,this.up),this.quaternion.setFromRotationMatrix(Ci),s&&(Ci.extractRotation(s.matrixWorld),cr.setFromRotationMatrix(Ci),this.quaternion.premultiply(cr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Pd),hr.child=e,this.dispatchEvent(hr),hr.child=null):Ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Pg),gh.child=e,this.dispatchEvent(gh),gh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ci),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Pd),hr.child=e,this.dispatchEvent(hr),hr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ua,e,Cg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ua,Ig,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),d=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Pt.DEFAULT_UP=new N(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ct=class extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Lg={type:"move"},Rr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ct,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ct,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ct,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),g=this._getHandJoint(l,x);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,p=.005;l.inputState.pinching&&u>d+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=d-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Lg)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ct;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Kp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},is={h:0,s:0,l:0},Xo={h:0,s:0,l:0};function xh(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ae=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ht.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ht.workingColorSpace){return this.r=e,this.g=t,this.b=n,ht.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ht.workingColorSpace){if(e=Tu(e,1),t=ot(t,0,1),n=ot(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=xh(a,r,e+1/3),this.g=xh(a,r,e),this.b=xh(a,r,e-1/3)}return ht.colorSpaceToWorking(this,s),this}setStyle(e,t=xt){function n(r){r!==void 0&&parseFloat(r)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=xt){let n=Kp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=Mr(e.r),this.g=Mr(e.g),this.b=Mr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xt){return ht.workingToColorSpace(vn.copy(this),e),Math.round(ot(vn.r*255,0,255))*65536+Math.round(ot(vn.g*255,0,255))*256+Math.round(ot(vn.b*255,0,255))}getHexString(e=xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ht.workingColorSpace){ht.workingToColorSpace(vn.copy(this),t);let n=vn.r,s=vn.g,r=vn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ht.workingColorSpace){return ht.workingToColorSpace(vn.copy(this),t),e.r=vn.r,e.g=vn.g,e.b=vn.b,e}getStyle(e=xt){ht.workingToColorSpace(vn.copy(this),e);let t=vn.r,n=vn.g,s=vn.b;return e!==xt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(is),this.setHSL(is.h+e,is.s+t,is.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(is),e.getHSL(Xo);let n=ba(is.h,Xo.h,t),s=ba(is.s,Xo.s,t),r=ba(is.l,Xo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},vn=new Ae;Ae.NAMES=Kp;var Ca=class extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $t,this.environmentIntensity=1,this.environmentRotation=new $t,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ti=new N,Ii=new N,_h=new N,Pi=new N,ur=new N,fr=new N,Ld=new N,vh=new N,yh=new N,Mh=new N,bh=new _t,Sh=new _t,Eh=new _t,ls=class i{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ti.subVectors(e,t),s.cross(ti);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ti.subVectors(s,t),Ii.subVectors(n,t),_h.subVectors(e,t);let a=ti.dot(ti),o=ti.dot(Ii),c=ti.dot(_h),l=Ii.dot(Ii),h=Ii.dot(_h),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(l*c-o*h)*u,p=(a*h-o*c)*u;return r.set(1-d-p,p,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Pi)===null?!1:Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Pi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Pi.x),c.addScaledVector(a,Pi.y),c.addScaledVector(o,Pi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return bh.setScalar(0),Sh.setScalar(0),Eh.setScalar(0),bh.fromBufferAttribute(e,t),Sh.fromBufferAttribute(e,n),Eh.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(bh,r.x),a.addScaledVector(Sh,r.y),a.addScaledVector(Eh,r.z),a}static isFrontFacing(e,t,n,s){return ti.subVectors(n,t),Ii.subVectors(e,t),ti.cross(Ii).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ti.subVectors(this.c,this.b),Ii.subVectors(this.a,this.b),ti.cross(Ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;ur.subVectors(s,n),fr.subVectors(r,n),vh.subVectors(e,n);let c=ur.dot(vh),l=fr.dot(vh);if(c<=0&&l<=0)return t.copy(n);yh.subVectors(e,s);let h=ur.dot(yh),f=fr.dot(yh);if(h>=0&&f<=h)return t.copy(s);let u=c*f-h*l;if(u<=0&&c>=0&&h<=0&&c-h>0)return a=c/(c-h),t.copy(n).addScaledVector(ur,a);Mh.subVectors(e,r);let d=ur.dot(Mh),p=fr.dot(Mh);if(p>=0&&d<=p)return t.copy(r);let x=d*l-c*p;if(x<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(fr,o);let m=h*p-d*f;if(m<=0&&f-h>=0&&d-p>=0)return Ld.subVectors(r,s),o=(f-h)/(f-h+(d-p)),t.copy(s).addScaledVector(Ld,o);let g=1/(m+x+u);return a=x*g,o=u*g,t.copy(n).addScaledVector(ur,a).addScaledVector(fr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Hn=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ni.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ni.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ni.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ni):ni.fromBufferAttribute(r,a),ni.applyMatrix4(e.matrixWorld),this.expandByPoint(ni);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qo.copy(n.boundingBox)),qo.applyMatrix4(e.matrixWorld),this.union(qo)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ni),ni.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fa),Yo.subVectors(this.max,fa),dr.subVectors(e.a,fa),pr.subVectors(e.b,fa),mr.subVectors(e.c,fa),ss.subVectors(pr,dr),rs.subVectors(mr,pr),Rs.subVectors(dr,mr);let t=[0,-ss.z,ss.y,0,-rs.z,rs.y,0,-Rs.z,Rs.y,ss.z,0,-ss.x,rs.z,0,-rs.x,Rs.z,0,-Rs.x,-ss.y,ss.x,0,-rs.y,rs.x,0,-Rs.y,Rs.x,0];return!wh(t,dr,pr,mr,Yo)||(t=[1,0,0,0,1,0,0,0,1],!wh(t,dr,pr,mr,Yo))?!1:(Zo.crossVectors(ss,rs),t=[Zo.x,Zo.y,Zo.z],wh(t,dr,pr,mr,Yo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ni).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ni).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Li=[new N,new N,new N,new N,new N,new N,new N,new N],ni=new N,qo=new Hn,dr=new N,pr=new N,mr=new N,ss=new N,rs=new N,Rs=new N,fa=new N,Yo=new N,Zo=new N,Cs=new N;function wh(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Cs.fromArray(i,r);let o=s.x*Math.abs(Cs.x)+s.y*Math.abs(Cs.y)+s.z*Math.abs(Cs.z),c=e.dot(Cs),l=t.dot(Cs),h=n.dot(Cs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Jt=new N,Ko=new ae,Ng=0,Ot=class extends gi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ng++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Eu,this.updateRanges=[],this.gpuType=Wn,this.version=0,this._normalizationScale=e!==void 0?Dc(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ko.fromBufferAttribute(this,t),Ko.applyMatrix3(e),this.setXY(t,Ko.x,Ko.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Ru(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Cu(e,this.array)}};var Ia=class extends Ot{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Pa=class extends Ot{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var He=class extends Ot{constructor(e,t,n){super(new Float32Array(e),t,n)}},Dg=new Hn,da=new N,Th=new N,Ln=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Dg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;da.subVectors(e,this.center);let t=da.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(da,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Th.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(da.copy(e.center).add(Th)),this.expandByPoint(da.copy(e.center).sub(Th))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ug=0,qn=new We,Ah=new Pt,gr=new N,zn=new Hn,pa=new Hn,ln=new N,gt=class i extends gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ug++}),this.uuid=li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ag(e)?Pa:Ia)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qn.makeRotationFromQuaternion(e),this.applyMatrix4(qn),this}rotateX(e){return qn.makeRotationX(e),this.applyMatrix4(qn),this}rotateY(e){return qn.makeRotationY(e),this.applyMatrix4(qn),this}rotateZ(e){return qn.makeRotationZ(e),this.applyMatrix4(qn),this}translate(e,t,n){return qn.makeTranslation(e,t,n),this.applyMatrix4(qn),this}scale(e,t,n){return qn.makeScale(e,t,n),this.applyMatrix4(qn),this}lookAt(e){return Ah.lookAt(e),Ah.updateMatrix(),this.applyMatrix4(Ah.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gr).negate(),this.translate(gr.x,gr.y,gr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new He(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];zn.setFromBufferAttribute(r),this.morphTargetsRelative?(ln.addVectors(this.boundingBox.min,zn.min),this.boundingBox.expandByPoint(ln),ln.addVectors(this.boundingBox.max,zn.max),this.boundingBox.expandByPoint(ln)):(this.boundingBox.expandByPoint(zn.min),this.boundingBox.expandByPoint(zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ln);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let n=this.boundingSphere.center;if(zn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];pa.setFromBufferAttribute(o),this.morphTargetsRelative?(ln.addVectors(zn.min,pa.min),zn.expandByPoint(ln),ln.addVectors(zn.max,pa.max),zn.expandByPoint(ln)):(zn.expandByPoint(pa.min),zn.expandByPoint(pa.max))}zn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)ln.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(ln));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)ln.fromBufferAttribute(o,l),c&&(gr.fromBufferAttribute(e,l),ln.add(gr)),s=Math.max(s,n.distanceToSquared(ln))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Ot(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[],l=new Uint8Array(n.count);for(let D=0;D<n.count;D++)o[D]=new N,c[D]=new N;let h=new N,f=new N,u=new N,d=new ae,p=new ae,x=new ae,m=new N,g=new N;function _(D,I,O){l[D]=l[I]=l[O]=1,h.fromBufferAttribute(n,D),f.fromBufferAttribute(n,I),u.fromBufferAttribute(n,O),d.fromBufferAttribute(r,D),p.fromBufferAttribute(r,I),x.fromBufferAttribute(r,O),f.sub(h),u.sub(h),p.sub(d),x.sub(d);let G=1/(p.x*x.y-x.x*p.y);isFinite(G)&&(m.copy(f).multiplyScalar(x.y).addScaledVector(u,-p.y).multiplyScalar(G),g.copy(u).multiplyScalar(p.x).addScaledVector(f,-x.x).multiplyScalar(G),o[D].add(m),o[I].add(m),o[O].add(m),c[D].add(g),c[I].add(g),c[O].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let D=0,I=y.length;D<I;++D){let O=y[D],G=O.start,Y=O.count;for(let P=G,U=G+Y;P<U;P+=3)_(e.getX(P+0),e.getX(P+1),e.getX(P+2))}let M=new N,w=new N,b=new N,v=new N;function S(D){b.fromBufferAttribute(s,D),v.copy(b);let I=o[D];M.copy(I),M.sub(b.multiplyScalar(b.dot(I))).normalize(),w.crossVectors(v,I);let G=w.dot(c[D])<0?-1:1;a.setXYZW(D,M.x,M.y,M.z,G)}for(let D=0,I=n.count;D<I;++D)l[D]&&S(D);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Ot(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let s=new N,r=new N,a=new N,o=new N,c=new N,l=new N,h=new N,f=new N;if(e)for(let u=0,d=e.count;u<d;u+=3){let p=e.getX(u+0),x=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,d=t.count;u<d;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ln.fromBufferAttribute(e,t),ln.normalize(),e.setXYZ(t,ln.x,ln.y,ln.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,f=o.normalized,u=new l.constructor(c.length*h),d=0,p=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?d=c[x]*o.data.stride+o.offset:d=c[x]*h;for(let g=0;g<h;g++)u[p++]=l[d++]}return new Ot(u,h,f)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,f=l.length;h<f;h++){let u=l[h],d=e(u,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){let d=l[f];h.push(d.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],f=r[l];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Cr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Eu,this.updateRanges=[],this.version=0,this.uuid=li()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Nd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Nd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function Nd(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=li()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var An=new N,Ir=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s,this._normalizationScale=e!==void 0?Dc(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyMatrix4(e),this.setXYZ(t,An.x,An.y,An.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyNormalMatrix(e),this.setXYZ(t,An.x,An.y,An.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.transformDirection(e),this.setXYZ(t,An.x,An.y,An.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ta("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ot(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ta("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Ru(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Cu(e,this.data.array)}},Rh=new N,Fg=new N,Og=new Je,ii=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Rh.subVectors(n,t).cross(Fg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Rh),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Og.getNormalMatrix(e),s=this.coplanarPoint(Rh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Bg=0,yn=class extends gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bg++}),this.uuid=li(),this.name="",this.type="Material",this.blending=Vr,this.side=vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=su,this.blendDst=ru,this.blendEquation=Ys,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ae(0,0,0),this.blendAlpha=0,this.depthFunc=br,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xl,this.stencilZFail=xl,this.stencilZPass=xl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ae().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new ii().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ae().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ae().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Ni=new N,Ch=new N,Jo=new N,$o=new N,Os=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ni.copy(this.origin).addScaledVector(this.direction,t),Ni.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ch.copy(e).add(t).multiplyScalar(.5),Jo.copy(t).sub(e).normalize(),$o.copy(this.origin).sub(Ch);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Jo),o=$o.dot(this.direction),c=-$o.dot(Jo),l=$o.lengthSq(),h=Math.abs(1-a*a),f,u,d,p;if(h>0)if(f=a*c-o,u=a*o-c,p=r*h,f>=0)if(u>=-p)if(u<=p){let x=1/h;f*=x,u*=x,d=f*(f+a*u+2*o)+u*(a*f+u+2*c)+l}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u<=-p?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l):u<=p?(f=0,u=Math.min(Math.max(-r,-c),r),d=u*(u+2*c)+l):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Ch).addScaledVector(Jo,u),d}intersectSphere(e,t){if(e.radius<0)return null;Ni.subVectors(e.center,this.origin);let n=Ni.dot(this.direction),s=Ni.dot(Ni)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ni)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,f=e.x-a.x,u=e.y-a.y,d=e.z-a.z,p=t.x-a.x,x=t.y-a.y,m=t.z-a.z,g=n.x-a.x,_=n.y-a.y,y=n.z-a.z,M=Math.abs(c),w=Math.abs(l),b=Math.abs(h),v,S,D,I,O,G,Y,P,U,H,L,K;if(M>=w&&M>=b?(D=c,G=f,U=p,K=g,c>=0?(v=l,S=h,I=u,O=d,Y=x,P=m,H=_,L=y):(v=h,S=l,I=d,O=u,Y=m,P=x,H=y,L=_)):w>=b?(D=l,G=u,U=x,K=_,l>=0?(v=h,S=c,I=d,O=f,Y=m,P=p,H=y,L=g):(v=c,S=h,I=f,O=d,Y=p,P=m,H=g,L=y)):(D=h,G=d,U=m,K=y,h>=0?(v=c,S=l,I=f,O=u,Y=p,P=x,H=g,L=_):(v=l,S=c,I=u,O=f,Y=x,P=p,H=_,L=g)),D===0)return null;let B=v/D,R=S/D,C=1/D,$=I-B*G,Me=O-R*G,q=Y-B*U,le=P-R*U,Ee=H-B*K,Be=L-R*K,ce=Ee*le-Be*q,Ie=$*Be-Me*Ee,dt=q*Me-le*$;if(s){if(ce<0||Ie<0||dt<0)return null}else if((ce<0||Ie<0||dt<0)&&(ce>0||Ie>0||dt>0))return null;let Pe=ce+Ie+dt;if(Pe===0)return null;let je=C*(ce*G+Ie*U+dt*K);return(Pe>0?je<0:je>0)?null:this.at(je/Pe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},At=class extends yn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $t,this.combine=oo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Dd=new We,Is=new Os,jo=new Ln,Ud=new N,Qo=new N,el=new N,tl=new N,Ih=new N,nl=new N,Fd=new N,il=new N,Qe=class extends Pt{constructor(e=new gt,t=new At){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){nl.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],f=r[c];h!==0&&(Ih.fromBufferAttribute(f,e),a?nl.addScaledVector(Ih,h):nl.addScaledVector(Ih.sub(t),h))}t.add(nl)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),jo.copy(n.boundingSphere),jo.applyMatrix4(r),Is.copy(e.ray).recast(e.near),!(jo.containsPoint(Is.origin)===!1&&(Is.intersectSphere(jo,Ud)===null||Is.origin.distanceToSquared(Ud)>(e.far-e.near)**2))&&(Dd.copy(r).invert(),Is.copy(e.ray).applyMatrix4(Dd),!(n.boundingBox!==null&&Is.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Is)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=u.length;p<x;p++){let m=u[p],g=a[m.materialIndex],_=Math.max(m.start,d.start),y=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let M=_,w=y;M<w;M+=3){let b=o.getX(M),v=o.getX(M+1),S=o.getX(M+2);s=sl(this,g,e,n,l,h,f,b,v,S),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let p=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let m=p,g=x;m<g;m+=3){let _=o.getX(m),y=o.getX(m+1),M=o.getX(m+2);s=sl(this,a,e,n,l,h,f,_,y,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let p=0,x=u.length;p<x;p++){let m=u[p],g=a[m.materialIndex],_=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let M=_,w=y;M<w;M+=3){let b=M,v=M+1,S=M+2;s=sl(this,g,e,n,l,h,f,b,v,S),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let p=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let m=p,g=x;m<g;m+=3){let _=m,y=m+1,M=m+2;s=sl(this,a,e,n,l,h,f,_,y,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function zg(i,e,t,n,s,r,a,o){let c;if(e.side===In?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===vi,o),c===null)return null;il.copy(o),il.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(il);return l<t.near||l>t.far?null:{distance:l,point:il.clone(),object:i}}function sl(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Qo),i.getVertexPosition(c,el),i.getVertexPosition(l,tl);let h=zg(i,e,t,n,Qo,el,tl,Fd);if(h){let f=new N;ls.getBarycoord(Fd,Qo,el,tl,f),s&&(h.uv=ls.getInterpolatedAttribute(s,o,c,l,f,new ae)),r&&(h.uv1=ls.getInterpolatedAttribute(r,o,c,l,f,new ae)),a&&(h.normal=ls.getInterpolatedAttribute(a,o,c,l,f,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new N,materialIndex:0};ls.getNormal(Qo,el,tl,u.normal),h.face=u,h.barycoord=f}return h}var ma=new _t,Od=new _t,Bd=new _t,kg=new _t,zd=new We,rl=new N,Ph=new Ln,kd=new We,Lh=new Os,La=class extends Qe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=zh,this.bindMatrix=new We,this.bindMatrixInverse=new We,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Hn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,rl),this.boundingBox.expandByPoint(rl)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ln),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,rl),this.boundingSphere.expandByPoint(rl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ph.copy(this.boundingSphere),Ph.applyMatrix4(s),e.ray.intersectsSphere(Ph)!==!1&&(kd.copy(s).invert(),Lh.copy(e.ray).applyMatrix4(kd),!(this.boundingBox!==null&&Lh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Lh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new _t,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===zh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Up?this.bindMatrixInverse.copy(this.bindMatrix).invert():Oe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Od.fromBufferAttribute(s.attributes.skinIndex,e),Bd.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(ma.copy(t),t.set(0,0,0,0)):(ma.set(t.x,t.y,t.z,1),t.set(0,0,0)),ma.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=Bd.getComponent(r);if(a!==0){let o=Od.getComponent(r);zd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(kg.copy(ma).applyMatrix4(zd),a)}}return t.isVector4&&(t.w=ma.w),t.applyMatrix4(this.bindMatrixInverse)}},Pr=class extends Pt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Lr=class extends tn{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Xt,h=Xt,f,u){super(null,a,o,c,l,h,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Hd=new We,Hg=new We,Na=class i{constructor(e=[],t=[]){this.uuid=li(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Oe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new We)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new We;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Hg;Hd.multiplyMatrices(o,t[r]),Hd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Lr(t,e,e,Kn,Wn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(Oe("Skeleton: No bone found with UUID:",r),a=new Pr),this.bones.push(a),this.boneInverses.push(new We().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},cn=class extends Ot{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},xr=new We,Gd=new We,al=[],Vd=new Hn,Gg=new We,ga=new Qe,xa=new Ln,hn=class extends Qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new cn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Gg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Hn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xr),Vd.copy(e.boundingBox).applyMatrix4(xr),this.boundingBox.union(Vd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ln),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xr),xa.copy(e.boundingSphere).applyMatrix4(xr),this.boundingSphere.union(xa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(ga.geometry=this.geometry,ga.material=this.material,ga.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xa.copy(this.boundingSphere),xa.applyMatrix4(n),e.ray.intersectsSphere(xa)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,xr),Gd.multiplyMatrices(n,xr),ga.matrixWorld=Gd,ga.raycast(e,al);for(let a=0,o=al.length;a<o;a++){let c=al[a];c.instanceId=r,c.object=this,t.push(c)}al.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new cn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Lr(new Float32Array(s*this.count),s,this.count,ec,Wn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ps=new Ln,Vg=new ae(.5,.5),ol=new N,cs=class{constructor(e=new ii,t=new ii,n=new ii,s=new ii,r=new ii,a=new ii){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Zn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],f=r[5],u=r[6],d=r[7],p=r[8],x=r[9],m=r[10],g=r[11],_=r[12],y=r[13],M=r[14],w=r[15];if(s[0].setComponents(l-a,d-h,g-p,w-_).normalize(),s[1].setComponents(l+a,d+h,g+p,w+_).normalize(),s[2].setComponents(l+o,d+f,g+x,w+y).normalize(),s[3].setComponents(l-o,d-f,g-x,w-y).normalize(),n)s[4].setComponents(c,u,m,M).normalize(),s[5].setComponents(l-c,d-u,g-m,w-M).normalize();else if(s[4].setComponents(l-c,d-u,g-m,w-M).normalize(),t===Zn)s[5].setComponents(l+c,d+u,g+m,w+M).normalize();else if(t===Er)s[5].setComponents(c,u,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ps.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ps.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ps)}intersectsSprite(e){Ps.center.set(0,0,0);let t=Vg.distanceTo(e.center);return Ps.radius=.7071067811865476+t,Ps.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ps)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(ol.x=s.normal.x>0?e.max.x:e.min.x,ol.y=s.normal.y>0?e.max.y:e.min.y,ol.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ol)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Wd=new We,Rl=class i{constructor(){this.coordinateSystem=Zn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];Wd.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new cs),n[s].setFromProjectionMatrix(Wd,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new cs),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var Nr=class extends yn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Cl=new N,Il=new N,Xd=new We,_a=new Os,ll=new Ln,Nh=new N,qd=new N,Bs=class extends Pt{constructor(e=new gt,t=new Nr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Cl.fromBufferAttribute(t,s-1),Il.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Cl.distanceTo(Il);e.setAttribute("lineDistance",new He(n,1))}else Oe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ll.copy(n.boundingSphere),ll.applyMatrix4(s),ll.radius+=r,e.ray.intersectsSphere(ll)===!1)return;Xd.copy(s).invert(),_a.copy(e.ray).applyMatrix4(Xd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let x=d,m=p-1;x<m;x+=l){let g=h.getX(x),_=h.getX(x+1),y=cl(this,e,_a,c,g,_,x);y&&t.push(y)}if(this.isLineLoop){let x=h.getX(p-1),m=h.getX(d),g=cl(this,e,_a,c,x,m,p-1);g&&t.push(g)}}else{let d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let x=d,m=p-1;x<m;x+=l){let g=cl(this,e,_a,c,x,x+1,x);g&&t.push(g)}if(this.isLineLoop){let x=cl(this,e,_a,c,p-1,d,p-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function cl(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Cl.fromBufferAttribute(o,s),Il.fromBufferAttribute(o,r),t.distanceSqToSegment(Cl,Il,Nh,qd)>n)return;Nh.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Nh);if(!(l<e.near||l>e.far))return{distance:l,point:qd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Yd=new N,Zd=new N,Da=class extends Bs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Yd.fromBufferAttribute(t,s),Zd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Yd.distanceTo(Zd);e.setAttribute("lineDistance",new He(n,1))}else Oe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ua=class extends Bs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Dr=class extends yn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Kd=new We,Wh=new Os,hl=new Ln,ul=new N,Fa=class extends Pt{constructor(e=new gt,t=new Dr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),hl.copy(n.boundingSphere),hl.applyMatrix4(s),hl.radius+=r,e.ray.intersectsSphere(hl)===!1)return;Kd.copy(s).invert(),Wh.copy(e.ray).applyMatrix4(Kd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,f=n.attributes.position;if(l!==null){let u=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let p=u,x=d;p<x;p++){let m=l.getX(p);ul.fromBufferAttribute(f,m),Jd(ul,m,c,s,e,t,this)}}else{let u=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let p=u,x=d;p<x;p++)ul.fromBufferAttribute(f,p),Jd(ul,p,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Jd(i,e,t,n,s,r,a){let o=Wh.distanceSqToPoint(i);if(o<t){let c=new N;Wh.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Oa=class extends tn{constructor(e=[],t=Zs,n,s,r,a,o,c,l,h){super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Gn=class extends tn{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Oi=class extends tn{constructor(e,t,n=ai,s,r,a,o=Xt,c=Xt,l,h=Fi,f=1){if(h!==Fi&&h!==qi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:f};super(u,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ar(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ba=class extends Oi{constructor(e,t=ai,n=Zs,s,r,a=Xt,o=Xt,c,l=Fi){let h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},za=class extends tn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Nn=class i extends gt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],f=[],u=0,d=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,s,a,2),p("x","z","y",1,-1,e,n,-t,s,a,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new He(l,3)),this.setAttribute("normal",new He(h,3)),this.setAttribute("uv",new He(f,2));function p(x,m,g,_,y,M,w,b,v,S,D){let I=M/v,O=w/S,G=M/2,Y=w/2,P=b/2,U=v+1,H=S+1,L=0,K=0,B=new N;for(let R=0;R<H;R++){let C=R*O-Y;for(let $=0;$<U;$++){let Me=$*I-G;B[x]=Me*_,B[m]=C*y,B[g]=P,l.push(B.x,B.y,B.z),B[x]=0,B[m]=0,B[g]=b>0?1:-1,h.push(B.x,B.y,B.z),f.push($/v),f.push(1-R/S),L+=1}}for(let R=0;R<S;R++)for(let C=0;C<v;C++){let $=u+C+U*R,Me=u+C+U*(R+1),q=u+(C+1)+U*(R+1),le=u+(C+1)+U*R;c.push($,Me,le),c.push(Me,q,le),K+=6}o.addGroup(d,K,D),d+=K,u+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var nn=class i extends gt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],u=[],d=[],p=0,x=[],m=n/2,g=0;_(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new He(f,3)),this.setAttribute("normal",new He(u,3)),this.setAttribute("uv",new He(d,2));function _(){let M=new N,w=new N,b=0,v=(t-e)/n;for(let S=0;S<=r;S++){let D=[],I=S/r,O=I*(t-e)+e;for(let G=0;G<=s;G++){let Y=G/s,P=Y*c+o,U=Math.sin(P),H=Math.cos(P);w.x=O*U,w.y=-I*n+m,w.z=O*H,f.push(w.x,w.y,w.z),M.set(U,v,H).normalize(),u.push(M.x,M.y,M.z),d.push(Y,1-I),D.push(p++)}x.push(D)}for(let S=0;S<s;S++)for(let D=0;D<r;D++){let I=x[D][S],O=x[D+1][S],G=x[D+1][S+1],Y=x[D][S+1];(e>0||D!==0)&&(h.push(I,O,Y),b+=3),(t>0||D!==r-1)&&(h.push(O,G,Y),b+=3)}l.addGroup(g,b,0),g+=b}function y(M){let w=p,b=new ae,v=new N,S=0,D=M===!0?e:t,I=M===!0?1:-1;for(let G=1;G<=s;G++)f.push(0,m*I,0),u.push(0,I,0),d.push(.5,.5),p++;let O=p;for(let G=0;G<=s;G++){let P=G/s*c+o,U=Math.cos(P),H=Math.sin(P);v.x=D*H,v.y=m*I,v.z=D*U,f.push(v.x,v.y,v.z),u.push(0,I,0),b.x=U*.5+.5,b.y=H*.5*I+.5,d.push(b.x,b.y),p++}for(let G=0;G<s;G++){let Y=w+G,P=O+G;M===!0?h.push(P,P+1,Y):h.push(P+1,P,Y),S+=3}l.addGroup(g,S,M===!0?1:2),g+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},hs=class i extends nn{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ur=class i extends gt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),l(n),h(),this.setAttribute("position",new He(r,3)),this.setAttribute("normal",new He(r.slice(),3)),this.setAttribute("uv",new He(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(_){let y=new N,M=new N,w=new N;for(let b=0;b<t.length;b+=3)d(t[b+0],y),d(t[b+1],M),d(t[b+2],w),c(y,M,w,_)}function c(_,y,M,w){let b=w+1,v=[];for(let S=0;S<=b;S++){v[S]=[];let D=_.clone().lerp(M,S/b),I=y.clone().lerp(M,S/b),O=b-S;for(let G=0;G<=O;G++)G===0&&S===b?v[S][G]=D:v[S][G]=D.clone().lerp(I,G/O)}for(let S=0;S<b;S++)for(let D=0;D<2*(b-S)-1;D++){let I=Math.floor(D/2);D%2===0?(u(v[S][I+1]),u(v[S+1][I]),u(v[S][I])):(u(v[S][I+1]),u(v[S+1][I+1]),u(v[S+1][I]))}}function l(_){let y=new N;for(let M=0;M<r.length;M+=3)y.x=r[M+0],y.y=r[M+1],y.z=r[M+2],y.normalize().multiplyScalar(_),r[M+0]=y.x,r[M+1]=y.y,r[M+2]=y.z}function h(){let _=new N;for(let y=0;y<r.length;y+=3){_.x=r[y+0],_.y=r[y+1],_.z=r[y+2];let M=m(_)/2/Math.PI+.5,w=g(_)/Math.PI+.5;a.push(M,1-w)}p(),f()}function f(){for(let _=0;_<a.length;_+=6){let y=a[_+0],M=a[_+2],w=a[_+4],b=Math.max(y,M,w),v=Math.min(y,M,w);b>.9&&v<.1&&(y<.2&&(a[_+0]+=1),M<.2&&(a[_+2]+=1),w<.2&&(a[_+4]+=1))}}function u(_){r.push(_.x,_.y,_.z)}function d(_,y){let M=_*3;y.x=e[M+0],y.y=e[M+1],y.z=e[M+2]}function p(){let _=new N,y=new N,M=new N,w=new N,b=new ae,v=new ae,S=new ae;for(let D=0,I=0;D<r.length;D+=9,I+=6){_.set(r[D+0],r[D+1],r[D+2]),y.set(r[D+3],r[D+4],r[D+5]),M.set(r[D+6],r[D+7],r[D+8]),b.set(a[I+0],a[I+1]),v.set(a[I+2],a[I+3]),S.set(a[I+4],a[I+5]),w.copy(_).add(y).add(M).divideScalar(3);let O=m(w);x(b,I+0,_,O),x(v,I+2,y,O),x(S,I+4,M,O)}}function x(_,y,M,w){w<0&&_.x===1&&(a[y]=_.x-1),M.x===0&&M.z===0&&(a[y]=w/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function g(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},ka=class i extends Ur{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Vn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Oe("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);let h=n[s],u=n[s+1]-h,d=(a-h)/u;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new ae:new N);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new N,s=[],r=[],a=[],o=new N,c=new We;for(let d=0;d<=e;d++){let p=d/e;s[d]=this.getTangentAt(p,new N)}r[0]=new N,a[0]=new N;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),u<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(ot(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(o,p))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(ot(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],d*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},Fr=class extends Vn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ae){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=c-this.aX,d=l-this.aY;c=u*h-d*f+this.aX,l=u*f+d*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Pl=class extends Fr{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Iu(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,f){let u=(a-r)/l-(o-r)/(l+h)+(o-a)/h,d=(o-a)/h-(c-a)/(h+f)+(c-o)/f;u*=h,d*=h,s(a,o,u,d)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var $d=new N,jd=new N,Dh=new Iu,Uh=new Iu,Fh=new Iu,Bi=class extends Vn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new N){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(jd.subVectors(s[0],s[1]).add(s[0]),l=jd);let f=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:($d.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=$d),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(f),d),x=Math.pow(f.distanceToSquared(u),d),m=Math.pow(u.distanceToSquared(h),d);x<1e-4&&(x=1),p<1e-4&&(p=x),m<1e-4&&(m=x),Dh.initNonuniformCatmullRom(l.x,f.x,u.x,h.x,p,x,m),Uh.initNonuniformCatmullRom(l.y,f.y,u.y,h.y,p,x,m),Fh.initNonuniformCatmullRom(l.z,f.z,u.z,h.z,p,x,m)}else this.curveType==="catmullrom"&&(Dh.initCatmullRom(l.x,f.x,u.x,h.x,this.tension),Uh.initCatmullRom(l.y,f.y,u.y,h.y,this.tension),Fh.initCatmullRom(l.z,f.z,u.z,h.z,this.tension));return n.set(Dh.calc(c),Uh.calc(c),Fh.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new N().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Qd(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function Wg(i,e){let t=1-i;return t*t*e}function Xg(i,e){return 2*(1-i)*i*e}function qg(i,e){return i*i*e}function Sa(i,e,t,n){return Wg(i,e)+Xg(i,t)+qg(i,n)}function Yg(i,e){let t=1-i;return t*t*t*e}function Zg(i,e){let t=1-i;return 3*t*t*i*e}function Kg(i,e){return 3*(1-i)*i*i*e}function Jg(i,e){return i*i*i*e}function Ea(i,e,t,n,s){return Yg(i,e)+Zg(i,t)+Kg(i,n)+Jg(i,s)}var Ha=class extends Vn{constructor(e=new ae,t=new ae,n=new ae,s=new ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ae){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ea(e,s.x,r.x,a.x,o.x),Ea(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ll=class extends Vn{constructor(e=new N,t=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new N){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ea(e,s.x,r.x,a.x,o.x),Ea(e,s.y,r.y,a.y,o.y),Ea(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ga=class extends Vn{constructor(e=new ae,t=new ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ae){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Nl=class extends Vn{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Va=class extends Vn{constructor(e=new ae,t=new ae,n=new ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ae){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Sa(e,s.x,r.x,a.x),Sa(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Wa=class extends Vn{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Sa(e,s.x,r.x,a.x),Sa(e,s.y,r.y,a.y),Sa(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xa=class extends Vn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ae){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(Qd(o,c.x,l.x,h.x,f.x),Qd(o,c.y,l.y,h.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new ae().fromArray(s))}return this}},Dl=Object.freeze({__proto__:null,ArcCurve:Pl,CatmullRomCurve3:Bi,CubicBezierCurve:Ha,CubicBezierCurve3:Ll,EllipseCurve:Fr,LineCurve:Ga,LineCurve3:Nl,QuadraticBezierCurve:Va,QuadraticBezierCurve3:Wa,SplineCurve:Xa}),Ul=class extends Vn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Dl[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Dl[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},zs=class extends Ul{constructor(e){super(),this.type="Path",this.currentPoint=new ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ga(this.currentPoint.clone(),new ae(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new Va(this.currentPoint.clone(),new ae(e,t),new ae(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new Ha(this.currentPoint.clone(),new ae(e,t),new ae(n,s),new ae(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Xa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){let l=new Fr(e,t,n,s,r,a,o,c);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Or=class extends zs{constructor(e){super(e),this.uuid=li(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new zs().fromJSON(s))}return this}};function $g(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Jp(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=nx(i,e,r,t)),i.length>80*t){o=i[0],c=i[1];let h=o,f=c;for(let u=t;u<s;u+=t){let d=i[u],p=i[u+1];d<o&&(o=d),p<c&&(c=p),d>h&&(h=d),p>f&&(f=p)}l=Math.max(h-o,f-c),l=l!==0?32767/l:0}return qa(r,a,t,o,c,l,0),a}function Jp(i,e,t,n,s){let r;if(s===dx(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=ep(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=ep(a/n|0,i[a],i[a+1],r);return r&&Br(r,r.next)&&(Za(r),r=r.next),r}function ks(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Br(t,t.next)||Vt(t.prev,t,t.next)===0)){if(Za(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function qa(i,e,t,n,s,r,a){if(!i)return;!a&&r&&ox(i,n,s,r);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?Qg(i,n,s,r):jg(i)){e.push(c.i,i.i,l.i),Za(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=ex(ks(i),e),qa(i,e,t,n,s,r,2)):a===2&&tx(i,e,t,n,s,r):qa(ks(i),e,t,n,s,r,1);break}}}function jg(i){let e=i.prev,t=i,n=i.next;if(Vt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(s,r,a),f=Math.min(o,c,l),u=Math.max(s,r,a),d=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=u&&p.y>=f&&p.y<=d&&va(s,o,r,c,a,l,p.x,p.y)&&Vt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Qg(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Vt(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,h=s.y,f=r.y,u=a.y,d=Math.min(o,c,l),p=Math.min(h,f,u),x=Math.max(o,c,l),m=Math.max(h,f,u),g=Xh(d,p,e,t,n),_=Xh(x,m,e,t,n),y=i.prevZ,M=i.nextZ;for(;y&&y.z>=g&&M&&M.z<=_;){if(y.x>=d&&y.x<=x&&y.y>=p&&y.y<=m&&y!==s&&y!==a&&va(o,h,c,f,l,u,y.x,y.y)&&Vt(y.prev,y,y.next)>=0||(y=y.prevZ,M.x>=d&&M.x<=x&&M.y>=p&&M.y<=m&&M!==s&&M!==a&&va(o,h,c,f,l,u,M.x,M.y)&&Vt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;y&&y.z>=g;){if(y.x>=d&&y.x<=x&&y.y>=p&&y.y<=m&&y!==s&&y!==a&&va(o,h,c,f,l,u,y.x,y.y)&&Vt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;M&&M.z<=_;){if(M.x>=d&&M.x<=x&&M.y>=p&&M.y<=m&&M!==s&&M!==a&&va(o,h,c,f,l,u,M.x,M.y)&&Vt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function ex(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Br(n,s)&&jp(n,t,t.next,s)&&Ya(n,s)&&Ya(s,n)&&(e.push(n.i,t.i,s.i),Za(t),Za(t.next),t=i=s),t=t.next}while(t!==i);return ks(t)}function tx(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&hx(a,o)){let c=Qp(a,o);a=ks(a,a.next),c=ks(c,c.next),qa(a,e,t,n,s,r,0),qa(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function nx(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=Jp(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(cx(l))}s.sort(ix);for(let r=0;r<s.length;r++)t=sx(s[r],t);return t}function ix(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function sx(i,e){let t=rx(i,e);if(!t)return e;let n=Qp(t,i);return ks(n,n.next),ks(t,t.next)}function rx(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(Br(i,t))return t;do{if(Br(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&$p(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){let f=Math.abs(s-t.y)/(n-t.x);Ya(t,i)&&(f<h||f===h&&(t.x>a.x||t.x===a.x&&ax(a,t)))&&(a=t,h=f)}t=t.next}while(t!==o);return a}function ax(i,e){return Vt(i.prev,i,e.prev)<0&&Vt(e.next,i,i.next)<0}function ox(i,e,t,n){let s=i;do s.z===0&&(s.z=Xh(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,lx(s)}function lx(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Xh(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function cx(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function $p(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function va(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&$p(i,e,t,n,s,r,a,o)}function hx(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!ux(i,e)&&(Ya(i,e)&&Ya(e,i)&&fx(i,e)&&(Vt(i.prev,i,e.prev)||Vt(i,e.prev,e))||Br(i,e)&&Vt(i.prev,i,i.next)>0&&Vt(e.prev,e,e.next)>0)}function Vt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Br(i,e){return i.x===e.x&&i.y===e.y}function jp(i,e,t,n){let s=dl(Vt(i,e,t)),r=dl(Vt(i,e,n)),a=dl(Vt(t,n,i)),o=dl(Vt(t,n,e));return!!(s!==r&&a!==o||s===0&&fl(i,t,e)||r===0&&fl(i,n,e)||a===0&&fl(t,i,n)||o===0&&fl(t,e,n))}function fl(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function dl(i){return i>0?1:i<0?-1:0}function ux(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&jp(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ya(i,e){return Vt(i.prev,i,i.next)<0?Vt(i,e,i.next)>=0&&Vt(i,i.prev,e)>=0:Vt(i,e,i.prev)<0||Vt(i,i.next,e)<0}function fx(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Qp(i,e){let t=qh(i.i,i.x,i.y),n=qh(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function ep(i,e,t,n){let s=qh(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Za(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function qh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function dx(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Yh=class{static triangulate(e,t,n=2){return $g(e,t,n)}},Ls=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];tp(e),np(n,e);let a=e.length;t.forEach(tp);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,np(n,t[c]);let o=Yh.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function tp(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function np(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Ka=class i extends gt{constructor(e=new Or([new ae(.5,.5),new ae(-.5,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o];a(l)}this.setAttribute("position",new He(s,3)),this.setAttribute("uv",new He(r,2)),this.computeVertexNormals();function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:d-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:px,y,M=!1,w,b,v,S;if(g){y=g.getSpacedPoints(h),M=!0,u=!1;let te=g.isCatmullRomCurve3?g.closed:!1;w=g.computeFrenetFrames(h,te),b=new N,v=new N,S=new N}u||(m=0,d=0,p=0,x=0);let D=o.extractPoints(l),I=D.shape,O=D.holes;if(!Ls.isClockWise(I)){I=I.reverse();for(let te=0,re=O.length;te<re;te++){let se=O[te];Ls.isClockWise(se)&&(O[te]=se.reverse())}}function Y(te){let se=10000000000000001e-36,we=te[0];for(let ue=1;ue<=te.length;ue++){let Xe=ue%te.length,Ce=te[Xe],nt=Ce.x-we.x,it=Ce.y-we.y,ct=nt*nt+it*it,k=Math.max(Math.abs(Ce.x),Math.abs(Ce.y),Math.abs(we.x),Math.abs(we.y)),Ze=se*k*k;if(ct<=Ze){te.splice(Xe,1),ue--;continue}we=Ce}}Y(I),O.forEach(Y);let P=O.length,U=I;for(let te=0;te<P;te++){let re=O[te];I=I.concat(re)}function H(te,re,se){return re||Ke("ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector(re,se)}let L=I.length;function K(te,re,se){let we,ue,Xe,Ce=te.x-re.x,nt=te.y-re.y,it=se.x-te.x,ct=se.y-te.y,k=Ce*Ce+nt*nt,Ze=Ce*ct-nt*it;if(Math.abs(Ze)>Number.EPSILON){let tt=Math.sqrt(k),Et=Math.sqrt(it*it+ct*ct),de=re.x-nt/tt,Mt=re.y+Ce/tt,ke=se.x-ct/Et,Ye=se.y+it/Et,T=((ke-de)*ct-(Ye-Mt)*it)/(Ce*ct-nt*it);we=de+Ce*T-te.x,ue=Mt+nt*T-te.y;let E=we*we+ue*ue;if(E<=2)return new ae(we,ue);Xe=Math.sqrt(E/2)}else{let tt=!1;Ce>Number.EPSILON?it>Number.EPSILON&&(tt=!0):Ce<-Number.EPSILON?it<-Number.EPSILON&&(tt=!0):Math.sign(nt)===Math.sign(ct)&&(tt=!0),tt?(we=-nt,ue=Ce,Xe=Math.sqrt(k)):(we=Ce,ue=nt,Xe=Math.sqrt(k/2))}return new ae(we/Xe,ue/Xe)}let B=[];for(let te=0,re=U.length,se=re-1,we=te+1;te<re;te++,se++,we++)se===re&&(se=0),we===re&&(we=0),B[te]=K(U[te],U[se],U[we]);let R=[],C,$=B.concat();for(let te=0,re=P;te<re;te++){let se=O[te];C=[];for(let we=0,ue=se.length,Xe=ue-1,Ce=we+1;we<ue;we++,Xe++,Ce++)Xe===ue&&(Xe=0),Ce===ue&&(Ce=0),C[we]=K(se[we],se[Xe],se[Ce]);R.push(C),$=$.concat(C)}let Me;if(m===0)Me=Ls.triangulateShape(U,O);else{let te=[],re=[];for(let se=0;se<m;se++){let we=se/m,ue=d*Math.cos(we*Math.PI/2),Xe=p*Math.sin(we*Math.PI/2)+x;for(let Ce=0,nt=U.length;Ce<nt;Ce++){let it=H(U[Ce],B[Ce],Xe);Ie(it.x,it.y,-ue),we===0&&te.push(it)}for(let Ce=0,nt=P;Ce<nt;Ce++){let it=O[Ce];C=R[Ce];let ct=[];for(let k=0,Ze=it.length;k<Ze;k++){let tt=H(it[k],C[k],Xe);Ie(tt.x,tt.y,-ue),we===0&&ct.push(tt)}we===0&&re.push(ct)}}Me=Ls.triangulateShape(te,re)}let q=Me.length,le=p+x;for(let te=0;te<L;te++){let re=u?H(I[te],$[te],le):I[te];M?(v.copy(w.normals[0]).multiplyScalar(re.x),b.copy(w.binormals[0]).multiplyScalar(re.y),S.copy(y[0]).add(v).add(b),Ie(S.x,S.y,S.z)):Ie(re.x,re.y,0)}for(let te=1;te<=h;te++)for(let re=0;re<L;re++){let se=u?H(I[re],$[re],le):I[re];M?(v.copy(w.normals[te]).multiplyScalar(se.x),b.copy(w.binormals[te]).multiplyScalar(se.y),S.copy(y[te]).add(v).add(b),Ie(S.x,S.y,S.z)):Ie(se.x,se.y,f/h*te)}for(let te=m-1;te>=0;te--){let re=te/m,se=d*Math.cos(re*Math.PI/2),we=p*Math.sin(re*Math.PI/2)+x;for(let ue=0,Xe=U.length;ue<Xe;ue++){let Ce=H(U[ue],B[ue],we);Ie(Ce.x,Ce.y,f+se)}for(let ue=0,Xe=O.length;ue<Xe;ue++){let Ce=O[ue];C=R[ue];for(let nt=0,it=Ce.length;nt<it;nt++){let ct=H(Ce[nt],C[nt],we);M?Ie(ct.x,ct.y+y[h-1].y,y[h-1].x+se):Ie(ct.x,ct.y,f+se)}}}Ee(),Be();function Ee(){let te=s.length/3;if(u){let re=0,se=L*re;for(let we=0;we<q;we++){let ue=Me[we];dt(ue[2]+se,ue[1]+se,ue[0]+se)}re=h+m*2,se=L*re;for(let we=0;we<q;we++){let ue=Me[we];dt(ue[0]+se,ue[1]+se,ue[2]+se)}}else{for(let re=0;re<q;re++){let se=Me[re];dt(se[2],se[1],se[0])}for(let re=0;re<q;re++){let se=Me[re];dt(se[0]+L*h,se[1]+L*h,se[2]+L*h)}}n.addGroup(te,s.length/3-te,0)}function Be(){let te=s.length/3,re=0;ce(U,re),re+=U.length;for(let se=0,we=O.length;se<we;se++){let ue=O[se];ce(ue,re),re+=ue.length}n.addGroup(te,s.length/3-te,1)}function ce(te,re){let se=te.length;for(;--se>=0;){let we=se,ue=se-1;ue<0&&(ue=te.length-1);for(let Xe=0,Ce=h+m*2;Xe<Ce;Xe++){let nt=L*Xe,it=L*(Xe+1),ct=re+we+nt,k=re+ue+nt,Ze=re+ue+it,tt=re+we+it;Pe(ct,k,Ze,tt)}}}function Ie(te,re,se){c.push(te),c.push(re),c.push(se)}function dt(te,re,se){je(te),je(re),je(se);let we=s.length/3,ue=_.generateTopUV(n,s,we-3,we-2,we-1);et(ue[0]),et(ue[1]),et(ue[2])}function Pe(te,re,se,we){je(te),je(re),je(we),je(re),je(se),je(we);let ue=s.length/3,Xe=_.generateSideWallUV(n,s,ue-6,ue-3,ue-2,ue-1);et(Xe[0]),et(Xe[1]),et(Xe[3]),et(Xe[1]),et(Xe[2]),et(Xe[3])}function je(te){s.push(c[te*3+0]),s.push(c[te*3+1]),s.push(c[te*3+2])}function et(te){r.push(te.x),r.push(te.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return mx(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Dl[s.type]().fromJSON(s)),new i(n,e.options)}},px={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new ae(r,a),new ae(o,c),new ae(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],f=e[n*3+2],u=e[s*3],d=e[s*3+1],p=e[s*3+2],x=e[r*3],m=e[r*3+1],g=e[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new ae(a,1-c),new ae(l,1-f),new ae(u,1-p),new ae(x,1-g)]:[new ae(o,1-c),new ae(h,1-f),new ae(d,1-p),new ae(m,1-g)]}};function mx(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Hs=class i extends Ur{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Ja=class i extends gt{constructor(e=[new ae(0,-.5),new ae(.5,0),new ae(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=ot(s,0,Math.PI*2);let r=[],a=[],o=[],c=[],l=[],h=1/t,f=new N,u=new ae,d=new N,p=new N,x=new N,m=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:m=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,d.x=g*1,d.y=-m,d.z=g*0,x.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case e.length-1:x.normalize(),c.push(x.x,x.y,x.z);break;default:m=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,d.x=g*1,d.y=-m,d.z=g*0,p.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),c.push(d.x,d.y,d.z),x.copy(p)}for(let _=0;_<=t;_++){let y=n+_*h*s,M=Math.sin(y),w=Math.cos(y);for(let b=0;b<=e.length-1;b++){f.x=e[b].x*M,f.y=e[b].y,f.z=e[b].x*w,a.push(f.x,f.y,f.z),u.x=_/t,u.y=b/(e.length-1),o.push(u.x,u.y);let v=c[3*b+0]*M,S=c[3*b+1],D=c[3*b+0]*w;l.push(v,S,D)}}for(let _=0;_<t;_++)for(let y=0;y<e.length-1;y++){let M=y+_*e.length,w=M,b=M+e.length,v=M+e.length+1,S=M+1;r.push(w,b,S),r.push(v,S,b)}this.setIndex(r),this.setAttribute("position",new He(a,3)),this.setAttribute("uv",new He(o,2)),this.setAttribute("normal",new He(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},Gs=class i extends Ur{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},zt=class i extends gt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,f=e/o,u=t/c,d=[],p=[],x=[],m=[];for(let g=0;g<h;g++){let _=g*u-a;for(let y=0;y<l;y++){let M=y*f-r;p.push(M,-_,0),x.push(0,0,1),m.push(y/o),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let _=0;_<o;_++){let y=_+l*g,M=_+l*(g+1),w=_+1+l*(g+1),b=_+1+l*g;d.push(y,M,b),d.push(M,w,b)}this.setIndex(d),this.setAttribute("position",new He(p,3)),this.setAttribute("normal",new He(x,3)),this.setAttribute("uv",new He(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},$a=class i extends gt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],c=[],l=[],h=[],f=e,u=(t-e)/s,d=new N,p=new ae;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){let g=r+m/n*a;d.x=f*Math.cos(g),d.y=f*Math.sin(g),c.push(d.x,d.y,d.z),l.push(0,0,1),p.x=(d.x/t+1)/2,p.y=(d.y/t+1)/2,h.push(p.x,p.y)}f+=u}for(let x=0;x<s;x++){let m=x*(n+1);for(let g=0;g<n;g++){let _=g+m,y=_,M=_+n+1,w=_+n+2,b=_+1;o.push(y,M,b),o.push(M,w,b)}}this.setIndex(o),this.setAttribute("position",new He(c,3)),this.setAttribute("normal",new He(l,3)),this.setAttribute("uv",new He(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var si=class i extends gt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],f=new N,u=new N,d=[],p=[],x=[],m=[];for(let g=0;g<=n;g++){let _=[],y=g/n,M=a+y*o,w=e*Math.cos(M),b=Math.sqrt(e*e-w*w),v=0;g===0&&a===0?v=.5/t:g===n&&c===Math.PI&&(v=-.5/t);for(let S=0;S<=t;S++){let D=S/t,I=s+D*r;f.x=-b*Math.cos(I),f.y=w,f.z=b*Math.sin(I),p.push(f.x,f.y,f.z),u.copy(f).normalize(),x.push(u.x,u.y,u.z),m.push(D+v,1-y),_.push(l++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let y=h[g][_+1],M=h[g][_],w=h[g+1][_],b=h[g+1][_+1];(g!==0||a>0)&&d.push(y,M,b),(g!==n-1||c<Math.PI)&&d.push(M,w,b)}this.setIndex(d),this.setAttribute("position",new He(p,3)),this.setAttribute("normal",new He(x,3)),this.setAttribute("uv",new He(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ri=class i extends gt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let c=[],l=[],h=[],f=[],u=new N,d=new N,p=new N;for(let x=0;x<=n;x++){let m=a+x/n*o;for(let g=0;g<=s;g++){let _=g/s*r;d.x=(e+t*Math.cos(m))*Math.cos(_),d.y=(e+t*Math.cos(m))*Math.sin(_),d.z=t*Math.sin(m),l.push(d.x,d.y,d.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),p.subVectors(d,u).normalize(),h.push(p.x,p.y,p.z),f.push(g/s),f.push(x/n)}}for(let x=1;x<=n;x++)for(let m=1;m<=s;m++){let g=(s+1)*x+m-1,_=(s+1)*(x-1)+m-1,y=(s+1)*(x-1)+m,M=(s+1)*x+m;c.push(g,_,M),c.push(_,y,M)}this.setIndex(c),this.setAttribute("position",new He(l,3)),this.setAttribute("normal",new He(h,3)),this.setAttribute("uv",new He(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var Vs=class i extends gt{constructor(e=new Wa(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new N,c=new N,l=new ae,h=new N,f=[],u=[],d=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new He(f,3)),this.setAttribute("normal",new He(u,3)),this.setAttribute("uv",new He(d,2));function x(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),_(),g()}function m(y){h=e.getPointAt(y/t,h);let M=a.normals[y],w=a.binormals[y];for(let b=0;b<=s;b++){let v=b/s*Math.PI*2,S=Math.sin(v),D=-Math.cos(v);c.x=D*M.x+S*w.x,c.y=D*M.y+S*w.y,c.z=D*M.z+S*w.z,c.normalize(),u.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,f.push(o.x,o.y,o.z)}}function g(){for(let y=1;y<=t;y++)for(let M=1;M<=s;M++){let w=(s+1)*(y-1)+(M-1),b=(s+1)*y+(M-1),v=(s+1)*y+M,S=(s+1)*(y-1)+M;p.push(w,b,S),p.push(b,v,S)}}function _(){for(let y=0;y<=t;y++)for(let M=0;M<=s;M++)l.x=y/t,l.y=M/s,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Dl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function $s(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(ip(s))s.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(ip(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Mn(i){let e={};for(let t=0;t<i.length;t++){let n=$s(i[t]);for(let s in n)e[s]=n[s]}return e}function ip(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function gx(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Pu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ht.workingColorSpace}var e0={clone:$s,merge:Mn},xx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_x=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,kt=class extends yn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xx,this.fragmentShader=_x,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$s(e.uniforms),this.uniformsGroups=gx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ae().setHex(s.value);break;case"v2":this.uniforms[n].value=new ae().fromArray(s.value);break;case"v3":this.uniforms[n].value=new N().fromArray(s.value);break;case"v4":this.uniforms[n].value=new _t().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Je().fromArray(s.value);break;case"m4":this.uniforms[n].value=new We().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Fl=class extends kt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},zi=class extends yn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zr,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $t,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Cn=class extends zi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ae(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ot(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Ae(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ae(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ae(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Ns('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Ns('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Bt=class extends yn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ae(16777215),this.specular=new Ae(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zr,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $t,this.combine=oo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var ja=class extends yn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zr,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $t,this.combine=oo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ol=class extends yn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Op,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Bl=class extends yn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function os(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ya(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function vx(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function sp(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function yx(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var xi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},zl=class extends xi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Hh,endingEnd:Hh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Gh:r=e,o=2*t-n;break;case Vh:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Gh:a=e,c=2*n-t;break;case Vh:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(n-t)/(s-t),x=p*p,m=x*p,g=-u*m+2*u*x-u*p,_=(1+u)*m+(-1.5-2*u)*x+(-.5+u)*p+1,y=(-1-d)*m+(1.5+d)*x+.5*p,M=d*m-d*x;for(let w=0;w!==o;++w)r[w]=g*a[h+w]+_*a[l+w]+y*a[c+w]+M*a[f+w];return r}},kl=class extends xi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),f=1-h;for(let u=0;u!==o;++u)r[u]=a[l+u]*f+a[c+u]*h;return r}},Hl=class extends xi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Gl=class extends xi{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let p=(n-t)/(s-t),x=1-p;for(let m=0;m!==o;++m)r[m]=a[l+m]*x+a[c+m]*p;return r}let u=o*2,d=e-1;for(let p=0;p!==o;++p){let x=a[l+p],m=a[c+p],g=d*u+p*2,_=f[g],y=f[g+1],M=e*u+p*2,w=h[M],b=h[M+1],v=bx(n,t,_,w,s);r[p]=t0(v,x,y,b,m)}return r}};function t0(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Mx(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function bx(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=t0(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let c=Mx(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var Dn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=os(t,this.TimeBufferType),this.values=os(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:os(e.times,Array),values:os(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),ya(e.settings)&&(n.settings={inTangents:os(e.settings.inTangents,Array),outTangents:os(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Hl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new kl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new zl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Gl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ds:t=this.InterpolantFactoryMethodDiscrete;break;case Us:t=this.InterpolantFactoryMethodLinear;break;case gl:t=this.InterpolantFactoryMethodSmooth;break;case kh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Oe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ds;case this.InterpolantFactoryMethodLinear:return Us;case this.InterpolantFactoryMethodSmooth:return gl;case this.InterpolantFactoryMethodBezier:return kh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;ya(this.settings)&&(rp(this.settings.inTangents,e),rp(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;ya(this.settings)&&(ap(this.settings.inTangents,e),ap(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ke("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ke("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Ke("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Ke("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&og(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Ke("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===gl,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let f=o*n,u=f-n,d=f+n;for(let p=0;p!==n;++p){let x=t[f+p];if(x!==t[u+p]||x!==t[d+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let f=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[f+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,ya(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function rp(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function ap(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Dn.prototype.ValueTypeName="";Dn.prototype.TimeBufferType=Float32Array;Dn.prototype.ValueBufferType=Float32Array;Dn.prototype.DefaultInterpolation=Us;var ki=class extends Dn{constructor(e,t,n){super(e,t,n)}};ki.prototype.ValueTypeName="bool";ki.prototype.ValueBufferType=Array;ki.prototype.DefaultInterpolation=Ds;ki.prototype.InterpolantFactoryMethodLinear=void 0;ki.prototype.InterpolantFactoryMethodSmooth=void 0;var Qa=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}};Qa.prototype.ValueTypeName="color";var Hi=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}};Hi.prototype.ValueTypeName="number";var Vl=class extends xi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)en.slerpFlat(r,0,a,l-o,a,l,c);return r}},Gi=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Vl(this.times,this.values,this.getValueSize(),e)}};Gi.prototype.ValueTypeName="quaternion";Gi.prototype.InterpolantFactoryMethodSmooth=void 0;var Vi=class extends Dn{constructor(e,t,n){super(e,t,n)}};Vi.prototype.ValueTypeName="string";Vi.prototype.ValueBufferType=Array;Vi.prototype.DefaultInterpolation=Ds;Vi.prototype.InterpolantFactoryMethodLinear=void 0;Vi.prototype.InterpolantFactoryMethodSmooth=void 0;var us=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}};us.prototype.ValueTypeName="vector";var eo=class{constructor(e="",t=-1,n=[],s=Fp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=li(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Ex(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(Dn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=vx(c);c=sp(c,1,h),l=sp(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Hi(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let f=h[1],u=s[f];u||(s[f]=u=[]),u.push(l)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Sx(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hi;case"vector":case"vector2":case"vector3":case"vector4":return us;case"color":return Qa;case"quaternion":return Gi;case"bool":case"boolean":return ki;case"string":return Vi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Ex(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Sx(i.type);if(i.times===void 0){let n=[],s=[];yx(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),ya(i.settings)&&(t.settings={inTangents:os(i.settings.inTangents,Float32Array),outTangents:os(i.settings.outTangents,Float32Array)}),t}var pi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(op(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!op(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function op(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Wl=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){let f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=l.length;f<u;f+=2){let d=l[f],p=l[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},n0=new Wl,_i=class{constructor(e){this.manager=e!==void 0?e:n0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};_i.DEFAULT_MATERIAL_NAME="__DEFAULT";var Di={},Zh=class extends Error{constructor(e,t){super(e),this.response=t}},zr=class extends _i{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=pi.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Di[e]!==void 0){Di[e].push({onLoad:t,onProgress:n,onError:s});return}Di[e]=[],Di[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Oe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=Di[e],f=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=u?parseInt(u):0,p=d!==0,x=0,m=new ReadableStream({start(g){_();function _(){f.read().then(({done:y,value:M})=>{if(y)g.close();else{x+=M.byteLength;let w=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:d});for(let b=0,v=h.length;b<v;b++){let S=h[b];S.onProgress&&S.onProgress(w)}g.enqueue(M),_()}},y=>{g.error(y)})}}});return new Response(m)}else throw new Zh(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let f=/charset="?([^;"\s]*)"?/i.exec(o),u=f&&f[1]?f[1].toLowerCase():void 0,d=new TextDecoder(u);return l.arrayBuffer().then(p=>d.decode(p))}}}).then(l=>{pi.add(`file:${e}`,l);let h=Di[e];delete Di[e];for(let f=0,u=h.length;f<u;f++){let d=h[f];d.onLoad&&d.onLoad(l)}}).catch(l=>{let h=Di[e];if(h===void 0)throw this.manager.itemError(e),l;delete Di[e];for(let f=0,u=h.length;f<u;f++){let d=h[f];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var _r=new WeakMap,Xl=class extends _i{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=pi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let f=_r.get(a);f===void 0&&(f=[],_r.set(a,f)),f.push({onLoad:t,onError:s})}return a}let o=wr("img");function c(){h(),t&&t(this);let f=_r.get(this)||[];for(let u=0;u<f.length;u++){let d=f[u];d.onLoad&&d.onLoad(this)}_r.delete(this),r.manager.itemEnd(e)}function l(f){h(),s&&s(f),pi.remove(`image:${e}`);let u=_r.get(this)||[];for(let d=0;d<u.length;d++){let p=u[d];p.onError&&p.onError(f)}_r.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),pi.add(`image:${e}`,o),r.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}};var Wi=class extends _i{constructor(e){super(e)}load(e,t,n,s){let r=new tn,a=new Xl(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Ws=class extends Pt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ae(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},to=class extends Ws{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ae(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Oh=new We,lp=new N,cp=new N,kr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.mapType=Fn,this.map=null,this.mapPass=null,this.matrix=new We,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cs,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;lp.setFromMatrixPosition(e.matrixWorld),t.position.copy(lp),cp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(cp),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Oh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Oh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Er||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Oh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},pl=new N,ml=new en,di=new N,no=class extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new We,this.projectionMatrix=new We,this.projectionMatrixInverse=new We,this.coordinateSystem=Zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(pl,ml,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pl,ml,di.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(pl,ml,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pl,ml,di.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},as=new N,hp=new ae,up=new ae,Qt=class extends no{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Fs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ma*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Fs*2*Math.atan(Math.tan(Ma*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){as.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(as.x,as.y).multiplyScalar(-e/as.z),as.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(as.x,as.y).multiplyScalar(-e/as.z)}getViewSize(e,t){return this.getViewBounds(e,hp,up),t.subVectors(up,hp)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ma*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Kh=class extends kr{constructor(){super(new Qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Fs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},io=class extends Ws{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Kh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Jh=class extends kr{constructor(){super(new Qt(90,1,.5,500)),this.isPointLightShadow=!0}},so=class extends Ws{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Jh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Xs=class extends no{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},$h=class extends kr{constructor(){super(new Xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},fs=class extends Ws{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new $h}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Xi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},ds=class extends gt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var Bh=new WeakMap,ro=class extends _i{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Oe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Oe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=pi.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{Bh.has(a)===!0?(s&&s(Bh.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.withCredentials||this.crossOrigin!=="anonymous"?"include":"same-origin",o.headers=this.requestHeader,o.priority=this.priority,o.cache=this.cache,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return pi.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Bh.set(c,l),pi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});pi.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var vr=-90,yr=1,Hr=class extends Pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Qt(vr,yr,e,t);s.layers=this.layers,this.add(s);let r=new Qt(vr,yr,e,t);r.layers=this.layers,this.add(r);let a=new Qt(vr,yr,e,t);a.layers=this.layers,this.add(a);let o=new Qt(vr,yr,e,t);o.layers=this.layers,this.add(o);let c=new Qt(vr,yr,e,t);c.layers=this.layers,this.add(c);let l=new Qt(vr,yr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Er)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=x,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ql=class extends Qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var Lu="\\[\\]\\.:\\/",wx=new RegExp("["+Lu+"]","g"),Nu="[^"+Lu+"]",Tx="[^"+Lu.replace("\\.","")+"]",Ax=/((?:WC+[\/:])*)/.source.replace("WC",Nu),Rx=/(WCOD+)?/.source.replace("WCOD",Tx),Cx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Nu),Ix=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Nu),Px=new RegExp("^"+Ax+Rx+Cx+Ix+"$"),Lx=["material","materials","bones","map"],jh=class{constructor(e,t,n){let s=n||Ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ut=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(wx,"")}static parseTrackName(e){let t=Px.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Lx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Oe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ke("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ke("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ke("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ke("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ke("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;Ke("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ut.Composite=jh;Ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ut.prototype.GetterByBindingType=[Ut.prototype._getValue_direct,Ut.prototype._getValue_array,Ut.prototype._getValue_arrayElement,Ut.prototype._getValue_toArray];Ut.prototype.SetterByBindingTypeAndVersioning=[[Ut.prototype._setValue_direct,Ut.prototype._setValue_direct_setNeedsUpdate,Ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_array,Ut.prototype._setValue_array_setNeedsUpdate,Ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_arrayElement,Ut.prototype._setValue_arrayElement_setNeedsUpdate,Ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_fromArray,Ut.prototype._setValue_fromArray_setNeedsUpdate,Ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ob=new Float32Array(1);var zu=class zu{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};zu.prototype.isMatrix2=!0;var Qh=zu;function Du(i,e,t,n){let s=Nx(n);switch(t){case _u:return i*e;case ec:return i*e/s.components*s.byteLength;case tc:return i*e/s.components*s.byteLength;case ps:return i*e*2/s.components*s.byteLength;case nc:return i*e*2/s.components*s.byteLength;case vu:return i*e*3/s.components*s.byteLength;case Kn:return i*e*4/s.components*s.byteLength;case ic:return i*e*4/s.components*s.byteLength;case lo:case co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ho:case uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case rc:case oc:return Math.max(i,16)*Math.max(e,8)/4;case sc:case ac:return Math.max(i,8)*Math.max(e,8)/2;case lc:case cc:case uc:case fc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case hc:case fo:case dc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case mc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case gc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case xc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case _c:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case vc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case yc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Mc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case bc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Sc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ec:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case wc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Tc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ac:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Rc:case Cc:case Ic:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Pc:case Lc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case po:case Nc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Nx(i){switch(i){case Fn:case pu:return{byteLength:1,components:1};case qr:case mu:case oi:return{byteLength:2,components:1};case jl:case Ql:return{byteLength:2,components:4};case ai:case $l:case Wn:return{byteLength:4,components:1};case gu:case xu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function E0(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Ux(i){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,f=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){let h=c.array,f=c.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,h);else{f.sort((d,p)=>d.start-p.start);let u=0;for(let d=1;d<f.length;d++){let p=f[u],x=f[d];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++u,f[u]=x)}f.length=u+1;for(let d=0,p=f.length;d<p;d++){let x=f[d];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Fx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ox=`#ifdef USE_ALPHAHASH
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
#endif`,Bx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gx=`#ifdef USE_AOMAP
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
#endif`,Vx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wx=`#ifdef USE_BATCHING
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
#endif`,Xx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Kx=`#ifdef USE_IRIDESCENCE
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
#endif`,Jx=`#ifdef USE_BUMPMAP
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
#endif`,$x=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,jx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,e_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,t_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,n_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,i_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,s_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,r_=`#define PI 3.141592653589793
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
} // validated`,a_=`vec3 transformedNormal = objectNormal;
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
#endif`,o_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,l_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,c_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,h_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,u_="gl_FragColor = linearToOutputTexel( gl_FragColor );",f_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,d_=`#ifdef USE_ENVMAP
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
#endif`,p_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,m_=`#ifdef USE_ENVMAP
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
#endif`,g_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,x_=`#ifdef USE_ENVMAP
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
#endif`,__=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,v_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,y_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,M_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,b_=`#ifdef USE_GRADIENTMAP
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
}`,S_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,E_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,w_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,T_=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,A_=`#ifdef USE_ENVMAP
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
#endif`,R_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,C_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,I_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,P_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,L_=`PhysicalMaterial material;
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
#endif`,N_=`uniform sampler2D dfgLUT;
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
}`,D_=`
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
#endif`,U_=`#if defined( RE_IndirectDiffuse )
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
#endif`,F_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,O_=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,B_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,z_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,H_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,G_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,V_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,W_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,X_=`#if defined( USE_POINTS_UV )
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
#endif`,q_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Y_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Z_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,K_=`#if defined( USE_MORPHCOLORS )
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
#endif`,J_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$_=`#ifdef USE_MORPHTARGETS
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
#endif`,j_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Q_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ev=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,tv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,iv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,sv=`#ifdef USE_NORMALMAP
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
#endif`,rv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,av=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ov=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,uv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_v=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,yv=`float getShadowMask() {
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
}`,Mv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bv=`#ifdef USE_SKINNING
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
#endif`,Sv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ev=`#ifdef USE_SKINNING
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
#endif`,wv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Av=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cv=`#ifdef USE_TRANSMISSION
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
#endif`,Iv=`#ifdef USE_TRANSMISSION
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
#endif`,Pv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Uv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fv=`uniform sampler2D t2D;
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
}`,Ov=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bv=`uniform float backgroundBlurriness;
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
}`,zv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hv=`#include <common>
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
}`,Gv=`#if DEPTH_PACKING == 3200
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
}`,Vv=`#define DISTANCE
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
}`,Wv=`#define DISTANCE
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
}`,Xv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yv=`uniform float scale;
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
}`,Zv=`uniform vec3 diffuse;
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
}`,Kv=`#include <common>
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
}`,Jv=`uniform vec3 diffuse;
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
}`,$v=`#define LAMBERT
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
}`,jv=`#define LAMBERT
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
}`,Qv=`#define MATCAP
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
}`,e1=`#define MATCAP
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
}`,t1=`#define NORMAL
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
}`,n1=`#define NORMAL
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
}`,i1=`#define PHONG
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
}`,s1=`#define PHONG
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
}`,r1=`#define STANDARD
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
}`,a1=`#define STANDARD
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
}`,o1=`#define TOON
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
}`,l1=`#define TOON
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
}`,c1=`uniform float size;
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
}`,h1=`uniform vec3 diffuse;
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
}`,u1=`#include <common>
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
}`,f1=`uniform vec3 color;
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
}`,d1=`uniform float rotation;
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
}`,p1=`uniform vec3 diffuse;
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
}`,lt={alphahash_fragment:Fx,alphahash_pars_fragment:Ox,alphamap_fragment:Bx,alphamap_pars_fragment:zx,alphatest_fragment:kx,alphatest_pars_fragment:Hx,aomap_fragment:Gx,aomap_pars_fragment:Vx,batching_pars_vertex:Wx,batching_vertex:Xx,begin_vertex:qx,beginnormal_vertex:Yx,bsdfs:Zx,iridescence_fragment:Kx,bumpmap_pars_fragment:Jx,clipping_planes_fragment:$x,clipping_planes_pars_fragment:jx,clipping_planes_pars_vertex:Qx,clipping_planes_vertex:e_,color_fragment:t_,color_pars_fragment:n_,color_pars_vertex:i_,color_vertex:s_,common:r_,defaultnormal_vertex:a_,displacementmap_pars_vertex:o_,displacementmap_vertex:l_,emissivemap_fragment:c_,emissivemap_pars_fragment:h_,colorspace_fragment:u_,colorspace_pars_fragment:f_,envmap_fragment:d_,envmap_common_pars_fragment:p_,envmap_pars_fragment:m_,envmap_pars_vertex:g_,envmap_physical_pars_fragment:A_,envmap_vertex:x_,fog_vertex:__,fog_pars_vertex:v_,fog_fragment:y_,fog_pars_fragment:M_,gradientmap_pars_fragment:b_,lightmap_pars_fragment:S_,lights_lambert_fragment:E_,lights_lambert_pars_fragment:w_,lights_pars_begin:T_,lights_toon_fragment:R_,lights_toon_pars_fragment:C_,lights_phong_fragment:I_,lights_phong_pars_fragment:P_,lights_physical_fragment:L_,lights_physical_pars_fragment:N_,lights_fragment_begin:D_,lights_fragment_maps:U_,lights_fragment_end:F_,lightprobes_pars_fragment:O_,logdepthbuf_fragment:B_,logdepthbuf_pars_fragment:z_,logdepthbuf_pars_vertex:k_,logdepthbuf_vertex:H_,map_fragment:G_,map_pars_fragment:V_,map_particle_fragment:W_,map_particle_pars_fragment:X_,metalnessmap_fragment:q_,metalnessmap_pars_fragment:Y_,morphinstance_vertex:Z_,morphcolor_vertex:K_,morphnormal_vertex:J_,morphtarget_pars_vertex:$_,morphtarget_vertex:j_,normal_fragment_begin:Q_,normal_fragment_maps:ev,normal_pars_fragment:tv,normal_pars_vertex:nv,normal_vertex:iv,normalmap_pars_fragment:sv,clearcoat_normal_fragment_begin:rv,clearcoat_normal_fragment_maps:av,clearcoat_pars_fragment:ov,iridescence_pars_fragment:lv,opaque_fragment:cv,packing:hv,premultiplied_alpha_fragment:uv,project_vertex:fv,dithering_fragment:dv,dithering_pars_fragment:pv,roughnessmap_fragment:mv,roughnessmap_pars_fragment:gv,shadowmap_pars_fragment:xv,shadowmap_pars_vertex:_v,shadowmap_vertex:vv,shadowmask_pars_fragment:yv,skinbase_vertex:Mv,skinning_pars_vertex:bv,skinning_vertex:Sv,skinnormal_vertex:Ev,specularmap_fragment:wv,specularmap_pars_fragment:Tv,tonemapping_fragment:Av,tonemapping_pars_fragment:Rv,transmission_fragment:Cv,transmission_pars_fragment:Iv,uv_pars_fragment:Pv,uv_pars_vertex:Lv,uv_vertex:Nv,worldpos_vertex:Dv,background_vert:Uv,background_frag:Fv,backgroundCube_vert:Ov,backgroundCube_frag:Bv,cube_vert:zv,cube_frag:kv,depth_vert:Hv,depth_frag:Gv,distance_vert:Vv,distance_frag:Wv,equirect_vert:Xv,equirect_frag:qv,linedashed_vert:Yv,linedashed_frag:Zv,meshbasic_vert:Kv,meshbasic_frag:Jv,meshlambert_vert:$v,meshlambert_frag:jv,meshmatcap_vert:Qv,meshmatcap_frag:e1,meshnormal_vert:t1,meshnormal_frag:n1,meshphong_vert:i1,meshphong_frag:s1,meshphysical_vert:r1,meshphysical_frag:a1,meshtoon_vert:o1,meshtoon_frag:l1,points_vert:c1,points_frag:h1,shadow_vert:u1,shadow_frag:f1,sprite_vert:d1,sprite_frag:p1},Se={common:{diffuse:{value:new Ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new Ae(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},bi={basic:{uniforms:Mn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:lt.meshbasic_vert,fragmentShader:lt.meshbasic_frag},lambert:{uniforms:Mn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ae(0)},envMapIntensity:{value:1}}]),vertexShader:lt.meshlambert_vert,fragmentShader:lt.meshlambert_frag},phong:{uniforms:Mn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ae(0)},specular:{value:new Ae(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:lt.meshphong_vert,fragmentShader:lt.meshphong_frag},standard:{uniforms:Mn([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new Ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag},toon:{uniforms:Mn([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new Ae(0)}}]),vertexShader:lt.meshtoon_vert,fragmentShader:lt.meshtoon_frag},matcap:{uniforms:Mn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:lt.meshmatcap_vert,fragmentShader:lt.meshmatcap_frag},points:{uniforms:Mn([Se.points,Se.fog]),vertexShader:lt.points_vert,fragmentShader:lt.points_frag},dashed:{uniforms:Mn([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:lt.linedashed_vert,fragmentShader:lt.linedashed_frag},depth:{uniforms:Mn([Se.common,Se.displacementmap]),vertexShader:lt.depth_vert,fragmentShader:lt.depth_frag},normal:{uniforms:Mn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:lt.meshnormal_vert,fragmentShader:lt.meshnormal_frag},sprite:{uniforms:Mn([Se.sprite,Se.fog]),vertexShader:lt.sprite_vert,fragmentShader:lt.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:lt.background_vert,fragmentShader:lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:lt.backgroundCube_vert,fragmentShader:lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:lt.cube_vert,fragmentShader:lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:lt.equirect_vert,fragmentShader:lt.equirect_frag},distance:{uniforms:Mn([Se.common,Se.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:lt.distance_vert,fragmentShader:lt.distance_frag},shadow:{uniforms:Mn([Se.lights,Se.fog,{color:{value:new Ae(0)},opacity:{value:1}}]),vertexShader:lt.shadow_vert,fragmentShader:lt.shadow_frag}};bi.physical={uniforms:Mn([bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Je},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new Ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new Ae(0)},specularColor:{value:new Ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag};var Uc={r:0,b:0,g:0},m1=new We,w0=new Je;w0.set(-1,0,0,0,1,0,0,0,1);function g1(i,e,t,n,s,r){let a=new Ae(0),o=s===!0?0:1,c,l,h=null,f=0,u=null;function d(_){let y=_.isScene===!0?_.background:null;if(y&&y.isTexture){let M=_.backgroundBlurriness>0;y=e.get(y,M)}return y}function p(_){let y=!1,M=d(_);M===null?m(a,o):M&&M.isColor&&(m(M,1),y=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(_,y){let M=d(y);M&&M.isCubeTexture?(l===void 0&&(l=new Qe(new Nn(1,1,1),new kt({name:"BackgroundCubeMaterial",uniforms:$s(bi.backgroundCube.uniforms),vertexShader:bi.backgroundCube.vertexShader,fragmentShader:bi.backgroundCube.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,b,v){this.matrixWorld.copyPosition(v.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(m1.makeRotationFromEuler(y.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(w0),l.material.toneMapped=ht.getTransfer(M.colorSpace)!==Tt,(h!==M||f!==M.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,f=M.version,u=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Qe(new zt(2,2),new kt({name:"BackgroundMaterial",uniforms:$s(bi.background.uniforms),vertexShader:bi.background.vertexShader,fragmentShader:bi.background.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=ht.getTransfer(M.colorSpace)!==Tt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,f=M.version,u=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function m(_,y){_.getRGB(Uc,Pu(i)),t.buffers.color.setClear(Uc.r,Uc.g,Uc.b,y,r)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,y=1){a.set(_),o=y,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,m(a,o)},render:p,addToRenderList:x,dispose:g}}function x1(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(O,G,Y,P,U){let H=!1,L=f(O,P,Y,G);r!==L&&(r=L,l(r.object)),H=d(O,P,Y,U),H&&p(O,P,Y,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,M(O,G,Y,P),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function c(){return i.createVertexArray()}function l(O){return i.bindVertexArray(O)}function h(O){return i.deleteVertexArray(O)}function f(O,G,Y,P){let U=P.wireframe===!0,H=n[G.id];H===void 0&&(H={},n[G.id]=H);let L=O.isInstancedMesh===!0?O.id:0,K=H[L];K===void 0&&(K={},H[L]=K);let B=K[Y.id];B===void 0&&(B={},K[Y.id]=B);let R=B[U];return R===void 0&&(R=u(c()),B[U]=R),R}function u(O){let G=[],Y=[],P=[];for(let U=0;U<t;U++)G[U]=0,Y[U]=0,P[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:Y,attributeDivisors:P,object:O,attributes:{},index:null}}function d(O,G,Y,P){let U=r.attributes,H=G.attributes,L=0,K=Y.getAttributes();for(let B in K)if(K[B].location>=0){let C=U[B],$=H[B];if($===void 0&&(B==="instanceMatrix"&&O.instanceMatrix&&($=O.instanceMatrix),B==="instanceColor"&&O.instanceColor&&($=O.instanceColor)),C===void 0||C.attribute!==$||$&&C.data!==$.data)return!0;L++}return r.attributesNum!==L||r.index!==P}function p(O,G,Y,P){let U={},H=G.attributes,L=0,K=Y.getAttributes();for(let B in K)if(K[B].location>=0){let C=H[B];C===void 0&&(B==="instanceMatrix"&&O.instanceMatrix&&(C=O.instanceMatrix),B==="instanceColor"&&O.instanceColor&&(C=O.instanceColor));let $={};$.attribute=C,C&&C.data&&($.data=C.data),U[B]=$,L++}r.attributes=U,r.attributesNum=L,r.index=P}function x(){let O=r.newAttributes;for(let G=0,Y=O.length;G<Y;G++)O[G]=0}function m(O){g(O,0)}function g(O,G){let Y=r.newAttributes,P=r.enabledAttributes,U=r.attributeDivisors;Y[O]=1,P[O]===0&&(i.enableVertexAttribArray(O),P[O]=1),U[O]!==G&&(i.vertexAttribDivisor(O,G),U[O]=G)}function _(){let O=r.newAttributes,G=r.enabledAttributes;for(let Y=0,P=G.length;Y<P;Y++)G[Y]!==O[Y]&&(i.disableVertexAttribArray(Y),G[Y]=0)}function y(O,G,Y,P,U,H,L){L===!0?i.vertexAttribIPointer(O,G,Y,U,H):i.vertexAttribPointer(O,G,Y,P,U,H)}function M(O,G,Y,P){x();let U=P.attributes,H=Y.getAttributes(),L=G.defaultAttributeValues;for(let K in H){let B=H[K];if(B.location>=0){let R=U[K];if(R===void 0&&(K==="instanceMatrix"&&O.instanceMatrix&&(R=O.instanceMatrix),K==="instanceColor"&&O.instanceColor&&(R=O.instanceColor)),R!==void 0){let C=R.normalized,$=R.itemSize,Me=e.get(R);if(Me===void 0)continue;let q=Me.buffer,le=Me.type,Ee=Me.bytesPerElement,Be=le===i.INT||le===i.UNSIGNED_INT||R.gpuType===$l;if(R.isInterleavedBufferAttribute){let ce=R.data,Ie=ce.isInterleavedBuffer===!0?ce.stride:ce.itemSize,dt=R.offset;if(ce.isInstancedInterleavedBuffer||ce.isInstancedBufferAttribute){for(let Pe=0;Pe<B.locationSize;Pe++)g(B.location+Pe,ce.meshPerAttribute);O.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Pe=0;Pe<B.locationSize;Pe++)m(B.location+Pe);i.bindBuffer(i.ARRAY_BUFFER,q);for(let Pe=0;Pe<B.locationSize;Pe++)y(B.location+Pe,$/B.locationSize,le,C,Ie*Ee,(dt+$/B.locationSize*Pe)*Ee,Be)}else{if(R.isInstancedBufferAttribute){for(let ce=0;ce<B.locationSize;ce++)g(B.location+ce,R.meshPerAttribute);O.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=R.meshPerAttribute*R.count)}else for(let ce=0;ce<B.locationSize;ce++)m(B.location+ce);i.bindBuffer(i.ARRAY_BUFFER,q);for(let ce=0;ce<B.locationSize;ce++)y(B.location+ce,$/B.locationSize,le,C,$*Ee,$/B.locationSize*ce*Ee,Be)}}else if(L!==void 0){let C=L[K];if(C!==void 0)switch(C.length){case 2:i.vertexAttrib2fv(B.location,C);break;case 3:i.vertexAttrib3fv(B.location,C);break;case 4:i.vertexAttrib4fv(B.location,C);break;default:i.vertexAttrib1fv(B.location,C)}}}}_()}function w(){D();for(let O in n){let G=n[O];for(let Y in G){let P=G[Y];for(let U in P){let H=P[U];for(let L in H)h(H[L].object),delete H[L];delete P[U]}}delete n[O]}}function b(O){if(n[O.id]===void 0)return;let G=n[O.id];for(let Y in G){let P=G[Y];for(let U in P){let H=P[U];for(let L in H)h(H[L].object),delete H[L];delete P[U]}}delete n[O.id]}function v(O){for(let G in n){let Y=n[G];for(let P in Y){let U=Y[P];if(U[O.id]===void 0)continue;let H=U[O.id];for(let L in H)h(H[L].object),delete H[L];delete U[O.id]}}}function S(O){for(let G in n){let Y=n[G],P=O.isInstancedMesh===!0?O.id:0,U=Y[P];if(U!==void 0){for(let H in U){let L=U[H];for(let K in L)h(L[K].object),delete L[K];delete U[H]}delete Y[P],Object.keys(Y).length===0&&delete n[G]}}}function D(){I(),a=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:I,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfObject:S,releaseStatesOfProgram:v,initAttributes:x,enableAttribute:m,disableUnusedAttributes:_}}function _1(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let d=0;d<h;d++)u+=l[d];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function v1(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let v=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(v.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(v){return!(v!==Kn&&n.convert(v)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(v){let S=v===oi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(v!==Fn&&v!==Wn&&!S&&n.convert(v)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(v){if(v==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";v="mediump"}return v==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Oe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),u=t.logarithmicDepthBuffer===!0&&f===!1;t.reversedDepthBuffer===!0&&f===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&f===!0&&Oe("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:M,maxSamples:w,samples:b}}function y1(i){let e=this,t=null,n=0,s=!1,r=!1,a=new ii,o=new Je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||n!==0||s;return s=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){let p=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,g=i.get(f);if(!s||p===null||p.length===0||r&&!m)r?h(null):l();else{let _=r?0:n,y=_*4,M=g.clippingState||null;c.value=M,M=h(p,u,y,d);for(let w=0;w!==y;++w)M[w]=t[w];g.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,d,p){let x=f!==null?f.length:0,m=null;if(x!==0){if(m=c.value,p!==!0||m===null){let g=d+x*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<g)&&(m=new Float32Array(g));for(let y=0,M=d;y!==x;++y,M+=4)a.copy(f[y]).applyMatrix4(_,o),a.normal.toArray(m,M),m[M+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}var _o=class extends kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Oa(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Nn(5,5,5),r=new kt({name:"CubemapFromEquirect",uniforms:$s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:In,blending:qs});r.uniforms.tEquirect.value=t;let a=new Qe(s,r),o=t.minFilter;return t.minFilter===Un&&(t.minFilter=qt),new Hr(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},i0=256,M1=3,b1=20,T0=256,A0=16,S1=3,E1=new N,w1=new Ae,Oc=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Hr(1,10,null),this._boxMesh=new Qe(new Nn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=E1}=r,c=this._renderer;this._setSize(a);let l=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let f=c.autoClear,u=c.autoClearColor,d=c.autoClearDepth,p=c.autoClearStencil,x=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,x===null&&(e.background=c.getClearColor(w1));let m=new Hr(n,s,h);return m.position.copy(o),m.update(c,e),c.autoClear=f,c.autoClearColor=u,c.autoClearDepth=d,c.autoClearStencil=p,e.background=x,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=a0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=r0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(i0,Au(e))}_fromTexture(e,t){e.mapping===Zs||e.mapping===Wr?this._setSize(e.image.length===0?i0:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=s0(e,!1,!1),n=Math.log2(e)-M1;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=s0(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Zs||e.mapping===Wr?(this._cubemapMaterial===null&&(this._cubemapMaterial=a0()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=r0()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=T1(),this._integrationMaterial=A1());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/A0);for(let a=0;a<=n;a++){let o=i.lodToRoughness(a,n);if(a>n-S1)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let c=o>0?Math.log2(t)+.5*Math.log2(6/(T0*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=R1());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function s0(i,e,t){return new _o(i,{minFilter:Un,generateMipmaps:e,type:oi,colorSpace:Rn,depthBuffer:t})}function vo(i,e,t){return new kt({name:i,uniforms:e,vertexShader:lt.cube_vert,fragmentShader:t,side:In,blending:qs,depthTest:!1,depthWrite:!1})}function T1(){return vo("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${T0}u

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
	`)}function A1(){return vo("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:A0}},`

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
	`)}function R1(){return vo("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${b1}
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
	`)}function r0(){return vo("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function a0(){return vo("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function C1(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===Zl||d===Kl)if(e.has(u)){let p=e.get(u).texture;return o(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let x=new _o(p.height);return x.fromEquirectangularTexture(i,u),e.set(u,x),u.addEventListener("dispose",l),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let d=u.mapping,p=d===Zl||d===Kl,x=d===Zs||d===Wr;if(p||x){let m=t.get(u),g=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return n===null&&(n=new Oc(i)),m=p?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{let _=u.image;return p&&_&&_.height>0||x&&_&&c(_)?(n===null&&(n=new Oc(i)),m=p?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,d){return d===Zl?u.mapping=Zs:d===Kl&&(u.mapping=Wr),u}function c(u){let d=0,p=6;for(let x=0;x<p;x++)u[x]!==void 0&&d++;return d===p}function l(u){let d=u.target;d.removeEventListener("dispose",l);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function I1(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Ns("WebGLRenderer: "+n+" extension not supported."),s}}}function P1(i,e,t,n){let s={},r=new WeakMap,a=new FinalizationRegistry(p=>delete s[p]);function o(p){c(p.target)}function c(p){p.index!==null&&e.remove(p.index);for(let m in p.attributes)e.remove(p.attributes[m]);p.removeEventListener("dispose",o),delete s[p.id],a.unregister(p);let x=r.get(p);x&&(e.remove(x),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function l(p,x){return s[x.id]!==void 0||(x.addEventListener("dispose",o),s[x.id]=new WeakRef(x),a.register(x,x.id,x),t.memory.geometries++),x}function h(p){let x=p.attributes;for(let m in x)e.update(x[m],i.ARRAY_BUFFER)}function f(p){let x=p.index,m=p.attributes.position,g=0;if(m===void 0)return;let _=x!==null?x.array.length:m.array.length/3-1,y=m.count>=65535?Pa:Ia,M=new y(Math.ceil(_/3)*6,1),w=M.array;if(x!==null){let v=x.array;g=x.version;for(let S=0,D=0;S<_;S+=3){let I=v[S+0],O=v[S+1],G=v[S+2];w[D++]=I,w[D++]=O,w[D++]=O,w[D++]=G,w[D++]=G,w[D++]=I}}else{g=m.version;for(let v=0,S=0;v<_;v+=3){let D=v+0,I=v+1,O=v+2;w[S++]=D,w[S++]=I,w[S++]=I,w[S++]=O,w[S++]=O,w[S++]=D}}M.version=g;let b=r.get(p);b&&e.remove(b),r.set(p,M)}function u(p){let x=r.get(p);if(x){let m=p.index;m!==null&&x.version<m.version&&f(p)}else f(p);return r.get(p)}function d(){for(let p in s){let x=s[p].deref();x!==void 0&&c(x)}}return{get:l,update:h,getWireframeAttribute:u,dispose:d}}function L1(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,u){i.drawElements(n,u,r,f*a),t.update(u,n,1)}function l(f,u,d){d!==0&&(i.drawElementsInstanced(n,u,r,f*a,d),t.update(u,n,d))}function h(f,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let x=0;for(let m=0;m<d;m++)x+=u[m];t.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function N1(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ke("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function D1(i,e,t){let n=new WeakMap,s=new _t;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==f){let D=function(){v.dispose(),n.delete(o),o.removeEventListener("dispose",D)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],_=o.morphAttributes.color||[],y=0;d===!0&&(y=1),p===!0&&(y=2),x===!0&&(y=3);let M=o.attributes.position.count*y,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let b=new Float32Array(M*w*4*f),v=new Aa(b,M,w,f);v.type=Wn,v.needsUpdate=!0;let S=y*4;for(let I=0;I<f;I++){let O=m[I],G=g[I],Y=_[I],P=M*w*4*I;for(let U=0;U<O.count;U++){let H=U*S;d===!0&&(s.fromBufferAttribute(O,U),b[P+H+0]=s.x,b[P+H+1]=s.y,b[P+H+2]=s.z,b[P+H+3]=0),p===!0&&(s.fromBufferAttribute(G,U),b[P+H+4]=s.x,b[P+H+5]=s.y,b[P+H+6]=s.z,b[P+H+7]=0),x===!0&&(s.fromBufferAttribute(Y,U),b[P+H+8]=s.x,b[P+H+9]=s.y,b[P+H+10]=s.z,b[P+H+11]=Y.itemSize===4?s.w:1)}}u={count:f,texture:v,size:new ae(M,w)},n.set(o,u),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let x=0;x<l.length;x++)d+=l[x];let p=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",p),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function U1(i,e,t,n,s){let r=new WeakMap;function a(l){let h=s.render.frame,f=l.geometry,u=e.get(l,f);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var F1={[au]:"LINEAR_TONE_MAPPING",[ou]:"REINHARD_TONE_MAPPING",[lu]:"CINEON_TONE_MAPPING",[cu]:"ACES_FILMIC_TONE_MAPPING",[uu]:"AGX_TONE_MAPPING",[fu]:"NEUTRAL_TONE_MAPPING",[hu]:"CUSTOM_TONE_MAPPING"};function O1(i,e,t,n,s,r){let a=new kn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=null,h=new gt;h.setAttribute("position",new He([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new He([0,2,0,0,2,0],2));let f=new Fl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Qe(h,f),d=new Xs(-1,1,1,-1,0,1),p=null,x=null,m=!1,g,_=null,y=[],M=!1;this.setSize=function(w,b){a.setSize(w,b),o!==null&&o.setSize(w,b),c!==null&&c.setSize(w,b);for(let v=0;v<y.length;v++){let S=y[v];S.setSize&&S.setSize(w,b)}},this.setEffects=function(w){y=w,M=y.length>0&&y[0].isRenderPass===!0;let b=a.width,v=a.height;y.length>0&&o===null&&(o=new kn(b,v,{type:oi,depthBuffer:!1,stencilBuffer:!1}),c=new kn(b,v,{type:oi,depthBuffer:!1,stencilBuffer:!1}));let S=s===!0&&y.some(D=>D.needsDepthTexture===!0);S!==(a.depthTexture!==null)&&(S===!0&&l===null&&(l=new Oi(b,v),r===!0&&(l.format=qi,l.type=Js)),a.dispose(),a.depthTexture=S?l:null,a.resolveDepthBuffer=S,a.storeMultisampledDepthBuffer=S);for(let D=0;D<y.length;D++){let I=y[D];I.setSize&&I.setSize(b,v),S&&I.needsDepthTexture===!0&&I.setDepthTexture&&I.setDepthTexture(l)}},this.begin=function(w,b){if(m||w.toneMapping===yi&&y.length===0)return!1;if(_=b,b!==null){let v=b.width,S=b.height;(a.width!==v||a.height!==S)&&this.setSize(v,S)}return M===!1&&w.setRenderTarget(a),g=w.toneMapping,w.toneMapping=yi,!0},this.hasRenderPass=function(){return M},this.end=function(w,b){w.toneMapping=g,m=!0;let v=a,S=o;for(let D=0;D<y.length;D++){let I=y[D];I.enabled!==!1&&(I.render(w,S,v,b),I.needsSwap!==!1&&(v=S,S=S===o?c:o))}if(p!==w.outputColorSpace||x!==w.toneMapping){p=w.outputColorSpace,x=w.toneMapping,f.defines={},ht.getTransfer(p)===Tt&&(f.defines.SRGB_TRANSFER="");let D=F1[x];D&&(f.defines[D]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=v.texture,w.setRenderTarget(_),w.render(u,d),_=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),h.dispose(),f.dispose()}}var R0=new tn,C0=new Oi(1,1),I0=new Ba(1),P0=new Aa,L0=new Al,N0=new Oa,o0=[],l0=[],c0=new Float32Array(16),h0=new Float32Array(9),u0=new Float32Array(4);function Jr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=o0[s];if(r===void 0&&(r=new Float32Array(s),o0[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function sn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function rn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function zc(i,e){let t=l0[e];t===void 0&&(t=new Int32Array(e),l0[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function B1(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function z1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;i.uniform2fv(this.addr,e),rn(t,e)}}function k1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(sn(t,e))return;i.uniform3fv(this.addr,e),rn(t,e)}}function H1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;i.uniform4fv(this.addr,e),rn(t,e)}}function G1(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,n))return;u0.set(n),i.uniformMatrix2fv(this.addr,!1,u0),rn(t,n)}}function V1(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,n))return;h0.set(n),i.uniformMatrix3fv(this.addr,!1,h0),rn(t,n)}}function W1(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,n))return;c0.set(n),i.uniformMatrix4fv(this.addr,!1,c0),rn(t,n)}}function X1(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function q1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;i.uniform2iv(this.addr,e),rn(t,e)}}function Y1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;i.uniform3iv(this.addr,e),rn(t,e)}}function Z1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;i.uniform4iv(this.addr,e),rn(t,e)}}function K1(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function J1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;i.uniform2uiv(this.addr,e),rn(t,e)}}function $1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;i.uniform3uiv(this.addr,e),rn(t,e)}}function j1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;i.uniform4uiv(this.addr,e),rn(t,e)}}function kc(i){return i.version===0&&(i.compareFunction=Su,i.needsUpdate=!0),i}function Q1(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=kc(C0):r=R0,t.setTexture2D(e||r,s)}function ey(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||L0,s)}function ty(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=kc(I0):r=N0,t.setTextureCube(e||r,s)}function ny(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||P0,s)}function iy(i){switch(i){case 5126:return B1;case 35664:return z1;case 35665:return k1;case 35666:return H1;case 35674:return G1;case 35675:return V1;case 35676:return W1;case 5124:case 35670:return X1;case 35667:case 35671:return q1;case 35668:case 35672:return Y1;case 35669:case 35673:return Z1;case 5125:return K1;case 36294:return J1;case 36295:return $1;case 36296:return j1;case 35678:case 36198:case 36298:case 36306:case 35682:return Q1;case 35679:case 36299:case 36307:return ey;case 35680:case 36300:case 36308:case 36293:return ty;case 36289:case 36303:case 36311:case 36292:return ny}}function sy(i,e){i.uniform1fv(this.addr,e)}function ry(i,e){let t=Jr(e,this.size,2);i.uniform2fv(this.addr,t)}function ay(i,e){let t=Jr(e,this.size,3);i.uniform3fv(this.addr,t)}function oy(i,e){let t=Jr(e,this.size,4);i.uniform4fv(this.addr,t)}function ly(i,e){let t=Jr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function cy(i,e){let t=Jr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function hy(i,e){let t=Jr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function uy(i,e){i.uniform1iv(this.addr,e)}function fy(i,e){i.uniform2iv(this.addr,e)}function dy(i,e){i.uniform3iv(this.addr,e)}function py(i,e){i.uniform4iv(this.addr,e)}function my(i,e){i.uniform1uiv(this.addr,e)}function gy(i,e){i.uniform2uiv(this.addr,e)}function xy(i,e){i.uniform3uiv(this.addr,e)}function _y(i,e){i.uniform4uiv(this.addr,e)}function vy(i,e,t){let n=this.cache,s=e.length,r=zc(t,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=kc(C0):a=R0;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function yy(i,e,t){let n=this.cache,s=e.length,r=zc(t,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||L0,r[a])}function My(i,e,t){let n=this.cache,s=e.length,r=zc(t,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=kc(I0):a=N0;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function by(i,e,t){let n=this.cache,s=e.length,r=zc(t,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||P0,r[a])}function Sy(i){switch(i){case 5126:return sy;case 35664:return ry;case 35665:return ay;case 35666:return oy;case 35674:return ly;case 35675:return cy;case 35676:return hy;case 5124:case 35670:return uy;case 35667:case 35671:return fy;case 35668:case 35672:return dy;case 35669:case 35673:return py;case 5125:return my;case 36294:return gy;case 36295:return xy;case 36296:return _y;case 35678:case 36198:case 36298:case 36306:case 35682:return vy;case 35679:case 36299:case 36307:return yy;case 35680:case 36300:case 36308:case 36293:return My;case 36289:case 36303:case 36311:case 36292:return by}}var Gu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=iy(t.type)}},Vu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sy(t.type)}},Wu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},ku=/(\w+)(\])?(\[|\.)?/g;function f0(i,e){i.seq.push(e),i.map[e.id]=e}function Ey(i,e,t){let n=i.name,s=n.length;for(ku.lastIndex=0;;){let r=ku.exec(n),a=ku.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){f0(t,l===void 0?new Gu(o,i,e):new Vu(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new Wu(o),f0(t,f)),t=f}}}var Kr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Ey(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function d0(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var wy=37297,Ty=0;function Ay(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var p0=new Je;function Ry(i){ht._getMatrix(p0,ht.workingColorSpace,i);let e=`mat3( ${p0.elements.map(t=>t.toFixed(4))} )`;switch(ht.getTransfer(i)){case wa:return[e,"LinearTransferOETF"];case Tt:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function m0(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Ay(i.getShaderSource(e),o)}else return r}function Cy(i,e){let t=Ry(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Iy={[au]:"Linear",[ou]:"Reinhard",[lu]:"Cineon",[cu]:"ACESFilmic",[uu]:"AgX",[fu]:"Neutral",[hu]:"Custom"};function Py(i,e){let t=Iy[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Fc=new N;function Ly(){ht.getLuminanceCoefficients(Fc);let i=Fc.x.toFixed(4),e=Fc.y.toFixed(4),t=Fc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ny(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xo).join(`
`)}function Dy(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Uy(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function xo(i){return i!==""}function g0(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function x0(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Fy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xu(i){return i.replace(Fy,Oy)}function Oy(i,e){let t=lt[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Xu(t)}var By=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _0(i){return i.replace(By,zy)}function zy(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function v0(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var ky={[ao]:"SHADOWMAP_TYPE_PCF",[Gr]:"SHADOWMAP_TYPE_VSM"};function Hy(i){return ky[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Gy={[Wr]:"ENVMAP_MODE_REFRACTION"};function Vy(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Gy[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Wy={[oo]:"ENVMAP_BLENDING_MULTIPLY",[Np]:"ENVMAP_BLENDING_MIX",[Dp]:"ENVMAP_BLENDING_ADD"};function Xy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Wy[i.combine]||"ENVMAP_BLENDING_NONE"}function qy(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Hy(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=Vy(t),f=Xy(t),u=Ny(t),d=Dy(r),p=s.createProgram(),x,m,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(xo).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(xo).join(`
`),m.length>0&&(m+=`
`)):(x=[v0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xo).join(`
`),m=[v0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yi?"#define TONE_MAPPING":"",t.toneMapping!==yi?lt.tonemapping_pars_fragment:"",t.toneMapping!==yi?Py("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",lt.colorspace_pars_fragment,Cy("linearToOutputTexel",t.outputColorSpace),Ly(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xo).join(`
`)),a=Xu(a),a=g0(a,t),a=x0(a,t),o=Xu(o),o=g0(o,t),o=x0(o,t),a=_0(a),o=_0(o),t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,x=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",t.glslVersion===wu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let _=g+x+a,y=g+m+o,M=d0(s,s.VERTEX_SHADER,_),w=d0(s,s.FRAGMENT_SHADER,y);s.attachShader(p,M),s.attachShader(p,w),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function b(I){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(p)||"",G=s.getShaderInfoLog(M)||"",Y=s.getShaderInfoLog(w)||"",P=O.trim(),U=G.trim(),H=Y.trim(),L=!0,K=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(L=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,M,w);else{let B=m0(s,M,"vertex"),R=m0(s,w,"fragment");Ke("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+P+`
`+B+`
`+R)}else P!==""?Oe("WebGLProgram: Program Info Log:",P):(U===""||H==="")&&(K=!1);K&&(I.diagnostics={runnable:L,programLog:P,vertexShader:{log:U,prefix:x},fragmentShader:{log:H,prefix:m}})}s.deleteShader(M),s.deleteShader(w),v=new Kr(s,p),S=Uy(s,p)}let v;this.getUniforms=function(){return v===void 0&&b(this),v};let S;this.getAttributes=function(){return S===void 0&&b(this),S};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(p,wy)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ty++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=M,this.fragmentShader=w,this}var Yy=0,qu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Yu(e),t.set(e,n)),n}},Yu=class{constructor(e){this.id=Yy++,this.code=e,this.usedTimes=0}};function Zy(i){return i===ps||i===fo||i===po}function Ky(i,e,t,n,s,r){let a=new Ra,o=new qu,c=new Set,l=[],h=new Map,f=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(v){return c.add(v),v===0?"uv":`uv${v}`}function p(v,S,D,I,O,G){let Y=I.fog,P=O.geometry,U=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?I.environment:null,H=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,L=e.get(v.envMap||U,H),K=u[v.type],B=n.precision;v.precision!==null&&(B=n.getMaxPrecision(v.precision),B!==v.precision&&Oe("WebGLProgram.getParameters:",v.precision,"not supported, using",B,"instead."));let R=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,C=R!==void 0?R.length:0,$=0;P.morphAttributes.position!==void 0&&($=1),P.morphAttributes.normal!==void 0&&($=2),P.morphAttributes.color!==void 0&&($=3);let Me,q,le,Ee;if(K){let be=bi[K];Me=be.vertexShader,q=be.fragmentShader}else{Me=v.vertexShader,q=v.fragmentShader;let be=o.getVertexShaderStage(v),Rt=o.getFragmentShaderStage(v);o.update(v,be,Rt),le=be.id,Ee=Rt.id}let Be=i.getRenderTarget(),ce=i.state.buffers.depth.getReversed(),Ie=O.isInstancedMesh===!0,dt=O.isBatchedMesh===!0,Pe=!!v.map,je=!!v.matcap,et=!!L,te=et&&L.isPMREMTexture===!0,re=!!v.aoMap,se=!!v.lightMap,we=!!v.bumpMap&&v.wireframe===!1,ue=!!v.normalMap,Xe=!!v.displacementMap,Ce=!!v.emissiveMap,nt=!!v.metalnessMap,it=!!v.roughnessMap,ct=v.anisotropy>0,k=v.clearcoat>0,Ze=v.diffuseRoughness>0,tt=v.dispersion>0,Et=v.retroreflectivity>0,de=v.iridescence>0,Mt=v.sheen>0,ke=v.transmission>0,Ye=ct&&!!v.anisotropyMap,T=k&&!!v.clearcoatMap,E=k&&!!v.clearcoatNormalMap,V=k&&!!v.clearcoatRoughnessMap,ie=Ze&&!!v.diffuseRoughnessMap,ne=de&&!!v.iridescenceMap,pe=de&&!!v.iridescenceThicknessMap,ve=Mt&&!!v.sheenColorMap,j=Mt&&!!v.sheenRoughnessMap,Q=!!v.specularMap,ge=!!v.specularColorMap,F=!!v.specularIntensityMap,ee=ke&&!!v.transmissionMap,J=ke&&!!v.thicknessMap,xe=!!v.gradientMap,he=!!v.alphaMap,me=v.alphaTest>0,ze=!!v.alphaHash,at=!!v.extensions,oe=yi;v.toneMapped&&(Be===null||Be.isXRRenderTarget===!0)&&(oe=i.toneMapping);let Ge=te?L.isCompressedCubeTexture?L.image[0].mipmaps:L.mipmaps:null,rt={shaderID:K,shaderType:v.type,shaderName:v.name,vertexShader:Me,fragmentShader:q,defines:v.defines,customVertexShaderID:le,customFragmentShaderID:Ee,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:B,batching:dt,batchingColor:dt&&O._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&O.instanceColor!==null,instancingMorph:Ie&&O.morphTexture!==null,outputColorSpace:Be===null?i.outputColorSpace:Be.isXRRenderTarget===!0?Be.texture.colorSpace:ht.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Pe,matcap:je,envMap:et,envMapMode:et&&L.mapping,envMapPMREM:te,envMapMaxLod:te?Ge.length-1:null,envMapSize:te?Ge[0].width:null,aoMap:re,lightMap:se,bumpMap:we,normalMap:ue,displacementMap:Xe,emissiveMap:Ce,normalMapObjectSpace:ue&&v.normalMapType===Bp,normalMapTangentSpace:ue&&v.normalMapType===Zr,packedNormalMap:ue&&v.normalMapType===Zr&&Zy(v.normalMap.format),metalnessMap:nt,roughnessMap:it,anisotropy:ct,anisotropyMap:Ye,clearcoat:k,clearcoatMap:T,clearcoatNormalMap:E,clearcoatRoughnessMap:V,diffuseRoughness:Ze,diffuseRoughnessMap:ie,dispersion:tt,retroreflection:Et,iridescence:de,iridescenceMap:ne,iridescenceThicknessMap:pe,sheen:Mt,sheenColorMap:ve,sheenRoughnessMap:j,specularMap:Q,specularColorMap:ge,specularIntensityMap:F,transmission:ke,transmissionMap:ee,thicknessMap:J,gradientMap:xe,opaque:v.transparent===!1&&v.blending===Vr&&v.alphaToCoverage===!1,alphaMap:he,alphaTest:me,alphaHash:ze,combine:v.combine,mapUv:Pe&&d(v.map.channel),aoMapUv:re&&d(v.aoMap.channel),lightMapUv:se&&d(v.lightMap.channel),bumpMapUv:we&&d(v.bumpMap.channel),normalMapUv:ue&&d(v.normalMap.channel),displacementMapUv:Xe&&d(v.displacementMap.channel),emissiveMapUv:Ce&&d(v.emissiveMap.channel),metalnessMapUv:nt&&d(v.metalnessMap.channel),roughnessMapUv:it&&d(v.roughnessMap.channel),anisotropyMapUv:Ye&&d(v.anisotropyMap.channel),clearcoatMapUv:T&&d(v.clearcoatMap.channel),clearcoatNormalMapUv:E&&d(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:V&&d(v.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ie&&d(v.diffuseRoughnessMap.channel),iridescenceMapUv:ne&&d(v.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&d(v.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&d(v.sheenColorMap.channel),sheenRoughnessMapUv:j&&d(v.sheenRoughnessMap.channel),specularMapUv:Q&&d(v.specularMap.channel),specularColorMapUv:ge&&d(v.specularColorMap.channel),specularIntensityMapUv:F&&d(v.specularIntensityMap.channel),transmissionMapUv:ee&&d(v.transmissionMap.channel),thicknessMapUv:J&&d(v.thicknessMap.channel),alphaMapUv:he&&d(v.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(ue||ct),vertexNormals:!!P.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!P.attributes.uv&&(Pe||he),fog:!!Y,useFog:v.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||P.attributes.normal===void 0&&ue===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ce,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:C,morphTextureStride:$,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:G.filter(be=>be.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:oe,decodeVideoTexture:Pe&&v.map.isVideoTexture===!0&&ht.getTransfer(v.map.colorSpace)===Tt,decodeVideoTextureEmissive:Ce&&v.emissiveMap.isVideoTexture===!0&&ht.getTransfer(v.emissiveMap.colorSpace)===Tt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Ht,flipSided:v.side===In,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:at&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(at&&v.extensions.multiDraw===!0||dt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return rt.vertexUv1s=c.has(1),rt.vertexUv2s=c.has(2),rt.vertexUv3s=c.has(3),c.clear(),rt}function x(v){let S=[];if(v.shaderID?S.push(v.shaderID):(S.push(v.customVertexShaderID),S.push(v.customFragmentShaderID)),v.defines!==void 0)for(let D in v.defines)S.push(D),S.push(v.defines[D]);return v.isRawShaderMaterial===!1&&(m(S,v),g(S,v),S.push(i.outputColorSpace)),S.push(v.customProgramCacheKey),S.join()}function m(v,S){v.push(S.precision),v.push(S.outputColorSpace),v.push(S.envMapMode),v.push(S.envMapPMREM),v.push(S.envMapMaxLod),v.push(S.envMapSize),v.push(S.mapUv),v.push(S.alphaMapUv),v.push(S.lightMapUv),v.push(S.aoMapUv),v.push(S.bumpMapUv),v.push(S.normalMapUv),v.push(S.displacementMapUv),v.push(S.emissiveMapUv),v.push(S.metalnessMapUv),v.push(S.roughnessMapUv),v.push(S.anisotropyMapUv),v.push(S.clearcoatMapUv),v.push(S.clearcoatNormalMapUv),v.push(S.clearcoatRoughnessMapUv),v.push(S.diffuseRoughnessMapUv),v.push(S.iridescenceMapUv),v.push(S.iridescenceThicknessMapUv),v.push(S.sheenColorMapUv),v.push(S.sheenRoughnessMapUv),v.push(S.specularMapUv),v.push(S.specularColorMapUv),v.push(S.specularIntensityMapUv),v.push(S.transmissionMapUv),v.push(S.thicknessMapUv),v.push(S.combine),v.push(S.fogExp2),v.push(S.sizeAttenuation),v.push(S.morphTargetsCount),v.push(S.numSunLights),v.push(S.numDirLights),v.push(S.numPointLights),v.push(S.numSpotLights),v.push(S.numSpotLightMaps),v.push(S.numHemiLights),v.push(S.numRectAreaLights),v.push(S.numSunLightShadows),v.push(S.numDirLightShadows),v.push(S.numPointLightShadows),v.push(S.numSpotLightShadows),v.push(S.numSpotLightShadowsWithMaps),v.push(S.numLightProbes),v.push(S.numLightProbeGrids),v.push(S.shadowMapType),v.push(S.toneMapping),v.push(S.numClippingPlanes),v.push(S.numClipIntersection),v.push(S.depthPacking)}function g(v,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.diffuseRoughness&&a.enable(25),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function _(v){let S=u[v.type],D;if(S){let I=bi[S];D=e0.clone(I.uniforms)}else D=v.uniforms;return D}function y(v,S){let D=h.get(S);return D!==void 0?++D.usedTimes:(D=new qy(i,S,v,s),l.push(D),h.set(S,D)),D}function M(v){if(--v.usedTimes===0){let S=l.indexOf(v);l[S]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function w(v){o.remove(v)}function b(){o.dispose()}return{getParameters:p,getProgramCacheKey:x,getUniforms:_,acquireProgram:y,releaseProgram:M,releaseShaderCache:w,programs:l,dispose:b}}function Jy(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function $y(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function y0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function M0(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,p,x,m,g){let _=i[e];return _===void 0?(_={id:u.id,object:u,geometry:d,material:p,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:g},i[e]=_):(_.id=u.id,_.object=u,_.geometry=d,_.material=p,_.materialVariant=a(u),_.groupOrder=x,_.renderOrder=u.renderOrder,_.z=m,_.group=g),e++,_}function c(u,d,p,x,m,g,_){_.reversedDepth===!0&&(m=-m);let y=o(u,d,p,x,m,g);p.transmission>0?n.push(y):p.transparent===!0?s.push(y):t.push(y)}function l(u,d,p,x,m,g){let _=o(u,d,p,x,m,g);p.transmission>0?n.unshift(_):p.transparent===!0?s.unshift(_):t.unshift(_)}function h(u,d){t.length>1&&t.sort(u||$y),n.length>1&&n.sort(d||y0),s.length>1&&s.sort(d||y0)}function f(){for(let u=e,d=i.length;u<d;u++){let p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:f,sort:h}}function jy(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new M0,i.set(n,[a])):s>=r.length?(a=new M0,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Qy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new N,color:new Ae};break;case"SpotLight":t={position:new N,direction:new N,color:new Ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Ae,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Ae,groundColor:new Ae};break;case"RectAreaLight":t={color:new Ae,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function eM(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var tM=0;function nM(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function iM(i){let e=new Qy,t=eM(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);let s=new N,r=new We,a=new We;function o(l){let h=0,f=0,u=0;for(let G=0;G<9;G++)n.probe[G].set(0,0,0);let d=0,p=0,x=0,m=0,g=0,_=0,y=0,M=0,w=0,b=0,v=0,S=0,D=0,I=0;l.sort(nM);for(let G=0,Y=l.length;G<Y;G++){let P=l[G],U=P.color,H=P.intensity,L=P.distance,K=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===ps?K=P.shadow.map.texture:K=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=U.r*H,f+=U.g*H,u+=U.b*H;else if(P.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(P.sh.coefficients[B],H);I++}else if(P.isSunLight){let B=e.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let R=P.shadow,C=t.get(P);C.shadowIntensity=R.intensity,C.shadowBias=R.bias,C.shadowNormalBias=R.normalBias,C.shadowRadius=R.radius,C.shadowMapSize.copy(R.mapSize).multiply(R.getFrameExtents()),n.sunShadow[p]=C,n.sunShadowMap[p]=K;let $=R.getViewportCount();for(let Me=0;Me<$;Me++)n.sunShadowMatrix[x+Me]=R.getMatrix(Me),n.sunShadowCascade[x+Me]=R._cascadeData[Me];x+=$,p++}n.sun[d]=B,d++}else if(P.isDirectionalLight){let B=e.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let R=P.shadow,C=t.get(P);C.shadowIntensity=R.intensity,C.shadowBias=R.bias,C.shadowNormalBias=R.normalBias,C.shadowRadius=R.radius,C.shadowMapSize=R.mapSize,n.directionalShadow[m]=C,n.directionalShadowMap[m]=K,n.directionalShadowMatrix[m]=P.shadow.matrix,w++}n.directional[m]=B,m++}else if(P.isSpotLight){let B=e.get(P);B.position.setFromMatrixPosition(P.matrixWorld),B.color.copy(U).multiplyScalar(H),B.distance=L,B.coneCos=Math.cos(P.angle),B.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),B.decay=P.decay,n.spot[_]=B;let R=P.shadow;if(P.map&&(n.spotLightMap[S]=P.map,S++,R.updateMatrices(P),P.castShadow&&D++),n.spotLightMatrix[_]=R.matrix,P.castShadow){let C=t.get(P);C.shadowIntensity=R.intensity,C.shadowBias=R.bias,C.shadowNormalBias=R.normalBias,C.shadowRadius=R.radius,C.shadowMapSize=R.mapSize,n.spotShadow[_]=C,n.spotShadowMap[_]=K,v++}_++}else if(P.isRectAreaLight){let B=e.get(P);B.color.copy(U).multiplyScalar(H),B.halfWidth.set(P.width*.5,0,0),B.halfHeight.set(0,P.height*.5,0),n.rectArea[y]=B,y++}else if(P.isPointLight){let B=e.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),B.distance=P.distance,B.decay=P.decay,P.castShadow){let R=P.shadow,C=t.get(P);C.shadowIntensity=R.intensity,C.shadowBias=R.bias,C.shadowNormalBias=R.normalBias,C.shadowRadius=R.radius,C.shadowMapSize=R.mapSize,C.shadowCameraNear=R.camera.near,C.shadowCameraFar=R.camera.far,n.pointShadow[g]=C,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=P.shadow.matrix,b++}n.point[g]=B,g++}else if(P.isHemisphereLight){let B=e.get(P);B.skyColor.copy(P.color).multiplyScalar(H),B.groundColor.copy(P.groundColor).multiplyScalar(H),n.hemi[M]=B,M++}}y>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Se.LTC_FLOAT_1,n.rectAreaLTC2=Se.LTC_FLOAT_2):(n.rectAreaLTC1=Se.LTC_HALF_1,n.rectAreaLTC2=Se.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;let O=n.hash;(O.sunLength!==d||O.directionalLength!==m||O.pointLength!==g||O.spotLength!==_||O.rectAreaLength!==y||O.hemiLength!==M||O.numSunShadows!==p||O.numDirectionalShadows!==w||O.numPointShadows!==b||O.numSpotShadows!==v||O.numSpotMaps!==S||O.numLightProbes!==I)&&(n.sun.length=d,n.directional.length=m,n.spot.length=_,n.rectArea.length=y,n.point.length=g,n.hemi.length=M,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=v,n.spotShadowMap.length=v,n.spotLightMatrix.length=v+S-D,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=I,O.sunLength=d,O.directionalLength=m,O.pointLength=g,O.spotLength=_,O.rectAreaLength=y,O.hemiLength=M,O.numSunShadows=p,O.numDirectionalShadows=w,O.numPointShadows=b,O.numSpotShadows=v,O.numSpotMaps=S,O.numLightProbes=I,n.version=tM++)}function c(l,h){let f=0,u=0,d=0,p=0,x=0,m=0,g=h.matrixWorldInverse;for(let _=0,y=l.length;_<y;_++){let M=l[_];if(M.isSunLight){let w=n.sun[f];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(g),f++}else if(M.isDirectionalLight){let w=n.directional[u];w.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),u++}else if(M.isSpotLight){let w=n.spot[p];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),p++}else if(M.isRectAreaLight){let w=n.rectArea[x];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(g),a.identity(),r.copy(M.matrixWorld),r.premultiply(g),a.extractRotation(r),w.halfWidth.set(M.width*.5,0,0),w.halfHeight.set(0,M.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(M.isPointLight){let w=n.point[d];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(g),d++}else if(M.isHemisphereLight){let w=n.hemi[m];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(g),m++}}}return{setup:o,setupView:c,state:n}}function b0(i){let e=new iM(i),t=[],n=[],s=[];function r(f){h.camera=f,t.length=0,n.length=0,s.length=0}function a(f){f.isLightProbeGrid?s.push(f):t.push(f)}function o(f){n.push(f)}function c(){e.setup(t),s.sort((f,u)=>f.priority-u.priority||f.id-u.id)}function l(f){e.setupView(t,f)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function sM(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new b0(i),e.set(s,[o])):r>=a.length?(o=new b0(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var rM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,aM=`uniform sampler2D shadow_pass;
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
}`,oM=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],lM=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],S0=new We,go=new N,Hu=new N;function cM(i,e,t){let n=new cs,s=new ae,r=new ae,a=new _t,o=new Ol,c=new Bl,l={},h=t.maxTextureSize,f={[vi]:In,[In]:vi,[Ht]:Ht},u=new kt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:rM,fragmentShader:aM}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let p=new gt;p.setAttribute("position",new Ot(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Qe(p,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ao;let g=this.type;this.render=function(b,v,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===pp&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ao);let D=i.getRenderTarget(),I=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),G=i.state;G.setBlending(qs),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let Y=g!==this.type;Y&&v.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(U=>U.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,U=b.length;P<U;P++){let H=b[P],L=H.shadow;if(L===void 0){Oe("WebGLShadowMap:",H,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;s.copy(L.mapSize);let K=L.getFrameExtents();s.multiply(K),r.copy(L.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/K.x),s.x=r.x*K.x,L.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/K.y),s.y=r.y*K.y,L.mapSize.y=r.y));let B=i.state.buffers.depth.getReversed();if(L.camera._reversedDepth=B,L.map===null||Y===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===Gr){if(H.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new kn(s.x,s.y,{format:ps,type:oi,minFilter:qt,magFilter:qt,generateMipmaps:!1}),L.map.texture.name=H.name+".shadowMap",L.map.depthTexture=new Oi(s.x,s.y,Wn),L.map.depthTexture.name=H.name+".shadowMapDepth",L.map.depthTexture.format=Fi,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Xt,L.map.depthTexture.magFilter=Xt}else H.isPointLight?(L.map=new _o(s.x),L.map.depthTexture=new Ba(s.x,ai)):(L.map=new kn(s.x,s.y),L.map.depthTexture=new Oi(s.x,s.y,ai)),L.map.depthTexture.name=H.name+".shadowMap",L.map.depthTexture.format=Fi,this.type===ao?(L.map.depthTexture.compareFunction=B?bu:Mu,L.map.depthTexture.minFilter=qt,L.map.depthTexture.magFilter=qt):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Xt,L.map.depthTexture.magFilter=Xt);L.camera.updateProjectionMatrix()}L.map.isWebGLCubeRenderTarget!==!0&&(L.map.width!==s.x||L.map.height!==s.y)&&L.map.setSize(s.x,s.y);let R=L.map.isWebGLCubeRenderTarget?6:L.getViewportCount();H.isPointLight!==!0&&L.updateMatrices(H,S);let C=(L.camera.layers.mask&4294967294)!==0?L.camera.layers:S.layers;for(let $=0;$<R;$++){let Me=L.getCamera($);if(H.isPointLight){let q=L.camera,le=L.matrix,Ee=H.distance||q.far;Ee!==q.far&&(q.far=Ee,q.updateProjectionMatrix()),go.setFromMatrixPosition(H.matrixWorld),q.position.copy(go),Hu.copy(q.position),Hu.add(oM[$]),q.up.copy(lM[$]),q.lookAt(Hu),q.updateMatrixWorld(),le.makeTranslation(-go.x,-go.y,-go.z),S0.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),L._frustum.setFromProjectionMatrix(S0,q.coordinateSystem,q.reversedDepth)}if(L.map.isWebGLCubeRenderTarget)i.setRenderTarget(L.map,$),i.clear();else{$===0&&(i.setRenderTarget(L.map),i.clear());let q=L.getViewport($);a.set(r.x*q.x,r.y*q.y,r.x*q.z,r.y*q.w),G.viewport(a)}n=L.getFrustum($),M(v,S,Me,H,C,this.type)}L.isPointLightShadow!==!0&&this.type===Gr&&_(L,S),L.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(D,I,O)};function _(b,v){let S=e.update(x);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null?b.mapPass=new kn(s.x,s.y,{format:ps,type:oi}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(v,null,S,u,x,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(v,null,S,d,x,null)}function y(b,v,S,D){let I=null,O=S.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(O!==void 0)I=O;else if(I=S.isPointLight===!0?c:o,i.localClippingEnabled&&v.clipShadows===!0&&Array.isArray(v.clippingPlanes)&&v.clippingPlanes.length!==0||v.displacementMap&&v.displacementScale!==0||v.alphaMap&&v.alphaTest>0||v.map&&v.alphaTest>0||v.alphaToCoverage===!0){let G=I.uuid,Y=v.uuid,P=l[G];P===void 0&&(P={},l[G]=P);let U=P[Y];U===void 0&&(U=I.clone(),P[Y]=U,v.addEventListener("dispose",w)),I=U}if(I.visible=v.visible,I.wireframe=v.wireframe,D===Gr?I.side=v.shadowSide!==null?v.shadowSide:v.side:I.side=v.shadowSide!==null?v.shadowSide:f[v.side],I.alphaMap=v.alphaMap,I.alphaTest=v.alphaToCoverage===!0?.5:v.alphaTest,I.map=v.map,I.clipShadows=v.clipShadows,I.clippingPlanes=v.clippingPlanes,I.clipIntersection=v.clipIntersection,I.displacementMap=v.displacementMap,I.displacementScale=v.displacementScale,I.displacementBias=v.displacementBias,I.wireframeLinewidth=v.wireframeLinewidth,I.linewidth=v.linewidth,S.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let G=i.properties.get(I);G.light=S}return I}function M(b,v,S,D,I,O){if(b.visible===!1)return;if(b.layers.test(I)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&O===Gr)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,b.matrixWorld);let P=e.update(b),U=b.material;if(Array.isArray(U)){let H=P.groups;for(let L=0,K=H.length;L<K;L++){let B=H[L],R=U[B.materialIndex];if(R&&R.visible){let C=y(b,R,D,O);b.onBeforeShadow(i,b,v,S,P,C,B),i.renderBufferDirect(S,null,P,C,b,B),b.onAfterShadow(i,b,v,S,P,C,B)}}}else if(U.visible){let H=y(b,U,D,O);b.onBeforeShadow(i,b,v,S,P,H,null),i.renderBufferDirect(S,null,P,H,b,null),b.onAfterShadow(i,b,v,S,P,H,null)}}let Y=b.children;for(let P=0,U=Y.length;P<U;P++)M(Y[P],v,S,D,I,O)}function w(b){b.target.removeEventListener("dispose",w);for(let S in l){let D=l[S],I=b.target.uuid;I in D&&(D[I].dispose(),delete D[I])}}}function hM(i,e){function t(){let F=!1,ee=new _t,J=null,xe=new _t(0,0,0,0);return{setMask:function(he){J!==he&&!F&&(i.colorMask(he,he,he,he),J=he)},setLocked:function(he){F=he},setClear:function(he,me,ze,at,oe){oe===!0&&(he*=at,me*=at,ze*=at),ee.set(he,me,ze,at),xe.equals(ee)===!1&&(i.clearColor(he,me,ze,at),xe.copy(ee))},reset:function(){F=!1,J=null,xe.set(-1,0,0,0)}}}function n(){let F=!1,ee=!1,J=null,xe=null,he=null;return{setReversed:function(me){if(ee!==me){let ze=e.get("EXT_clip_control");me?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),ee=me;let at=he;he=null,this.setClear(at)}},getReversed:function(){return ee},setTest:function(me){me?ce(i.DEPTH_TEST):Ie(i.DEPTH_TEST)},setMask:function(me){J!==me&&!F&&(i.depthMask(me),J=me)},setFunc:function(me){if(ee&&(me=Zp[me]),xe!==me){switch(me){case _l:i.depthFunc(i.NEVER);break;case vl:i.depthFunc(i.ALWAYS);break;case yl:i.depthFunc(i.LESS);break;case br:i.depthFunc(i.LEQUAL);break;case Ml:i.depthFunc(i.EQUAL);break;case bl:i.depthFunc(i.GEQUAL);break;case Sl:i.depthFunc(i.GREATER);break;case El:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}xe=me}},setLocked:function(me){F=me},setClear:function(me){he!==me&&(he=me,ee&&(me=1-me),i.clearDepth(me))},reset:function(){F=!1,J=null,xe=null,he=null,ee=!1}}}function s(){let F=!1,ee=null,J=null,xe=null,he=null,me=null,ze=null,at=null,oe=null;return{setTest:function(Ge){F||(Ge?ce(i.STENCIL_TEST):Ie(i.STENCIL_TEST))},setMask:function(Ge){ee!==Ge&&!F&&(i.stencilMask(Ge),ee=Ge)},setFunc:function(Ge,rt,be){(J!==Ge||xe!==rt||he!==be)&&(i.stencilFunc(Ge,rt,be),J=Ge,xe=rt,he=be)},setOp:function(Ge,rt,be){(me!==Ge||ze!==rt||at!==be)&&(i.stencilOp(Ge,rt,be),me=Ge,ze=rt,at=be)},setLocked:function(Ge){F=Ge},setClear:function(Ge){oe!==Ge&&(i.clearStencil(Ge),oe=Ge)},reset:function(){F=!1,ee=null,J=null,xe=null,he=null,me=null,ze=null,at=null,oe=null}}}let r=new t,a=new n,o=new s,c={},l=new WeakMap,h={},f={},u={},d=new WeakMap,p=[],x=null,m=!1,g=null,_=null,y=null,M=null,w=null,b=null,v=null,S=new Ae(0,0,0),D=0,I=!1,O=null,G=null,Y=null,P=null,U=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),L=!1,K=0,B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(B)[1]),L=K>=1):B.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),L=K>=2);let R=null,C={},$=i.getParameter(i.SCISSOR_BOX),Me=i.getParameter(i.VIEWPORT),q=new _t().fromArray($),le=new _t().fromArray(Me);function Ee(F,ee,J,xe){let he=new Uint8Array(4),me=i.createTexture();i.bindTexture(F,me),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ze=0;ze<J;ze++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(ee,0,i.RGBA,1,1,xe,0,i.RGBA,i.UNSIGNED_BYTE,he):i.texImage2D(ee+ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,he);return me}let Be={};Be[i.TEXTURE_2D]=Ee(i.TEXTURE_2D,i.TEXTURE_2D,1),Be[i.TEXTURE_CUBE_MAP]=Ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Be[i.TEXTURE_2D_ARRAY]=Ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Be[i.TEXTURE_3D]=Ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ce(i.DEPTH_TEST),a.setFunc(br),we(!1),ue(eu),ce(i.CULL_FACE),re(qs);function ce(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function Ie(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function dt(F,ee){return u[F]!==ee?(i.bindFramebuffer(F,ee),u[F]=ee,F===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ee),F===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ee),!0):!1}function Pe(F,ee){let J=p,xe=!1;if(F){J=d.get(ee),J===void 0&&(J=[],d.set(ee,J));let he=F.textures;if(J.length!==he.length||J[0]!==i.COLOR_ATTACHMENT0){for(let me=0,ze=he.length;me<ze;me++)J[me]=i.COLOR_ATTACHMENT0+me;J.length=he.length,xe=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,xe=!0);xe&&i.drawBuffers(J)}function je(F){return x!==F?(i.useProgram(F),x=F,!0):!1}let et={[Ys]:i.FUNC_ADD,[gp]:i.FUNC_SUBTRACT,[xp]:i.FUNC_REVERSE_SUBTRACT};et[_p]=i.MIN,et[vp]=i.MAX;let te={[yp]:i.ZERO,[Mp]:i.ONE,[bp]:i.SRC_COLOR,[su]:i.SRC_ALPHA,[Rp]:i.SRC_ALPHA_SATURATE,[Tp]:i.DST_COLOR,[Ep]:i.DST_ALPHA,[Sp]:i.ONE_MINUS_SRC_COLOR,[ru]:i.ONE_MINUS_SRC_ALPHA,[Ap]:i.ONE_MINUS_DST_COLOR,[wp]:i.ONE_MINUS_DST_ALPHA,[Cp]:i.CONSTANT_COLOR,[Ip]:i.ONE_MINUS_CONSTANT_COLOR,[Pp]:i.CONSTANT_ALPHA,[Lp]:i.ONE_MINUS_CONSTANT_ALPHA};function re(F,ee,J,xe,he,me,ze,at,oe,Ge){if(F===qs){m===!0&&(Ie(i.BLEND),m=!1);return}if(m===!1&&(ce(i.BLEND),m=!0),F!==mp){if(F!==g||Ge!==I){if((_!==Ys||w!==Ys)&&(i.blendEquation(i.FUNC_ADD),_=Ys,w=Ys),Ge)switch(F){case Vr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tu:i.blendFunc(i.ONE,i.ONE);break;case nu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case iu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ke("WebGLState: Invalid blending: ",F);break}else switch(F){case Vr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tu:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case nu:Ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case iu:Ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ke("WebGLState: Invalid blending: ",F);break}y=null,M=null,b=null,v=null,S.set(0,0,0),D=0,g=F,I=Ge}return}he=he||ee,me=me||J,ze=ze||xe,(ee!==_||he!==w)&&(i.blendEquationSeparate(et[ee],et[he]),_=ee,w=he),(J!==y||xe!==M||me!==b||ze!==v)&&(i.blendFuncSeparate(te[J],te[xe],te[me],te[ze]),y=J,M=xe,b=me,v=ze),(at.equals(S)===!1||oe!==D)&&(i.blendColor(at.r,at.g,at.b,oe),S.copy(at),D=oe),g=F,I=!1}function se(F,ee){F.side===Ht?Ie(i.CULL_FACE):ce(i.CULL_FACE);let J=F.side===In;ee&&(J=!J),we(J),F.blending===Vr&&F.transparent===!1?re(qs):re(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);let xe=F.stencilWrite;o.setTest(xe),xe&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ce(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):Ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function we(F){O!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),O=F)}function ue(F){F!==fp?(ce(i.CULL_FACE),F!==G&&(F===eu?i.cullFace(i.BACK):F===dp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ie(i.CULL_FACE),G=F}function Xe(F){F!==Y&&(L&&i.lineWidth(F),Y=F)}function Ce(F,ee,J){F?(ce(i.POLYGON_OFFSET_FILL),(P!==ee||U!==J)&&(P=ee,U=J,a.getReversed()&&(ee=-ee,J=-J),i.polygonOffset(ee,J))):Ie(i.POLYGON_OFFSET_FILL)}function nt(F){F?ce(i.SCISSOR_TEST):Ie(i.SCISSOR_TEST)}function it(F){F===void 0&&(F=i.TEXTURE0+H-1),R!==F&&(i.activeTexture(F),R=F)}function ct(F,ee,J){J===void 0&&(R===null?J=i.TEXTURE0+H-1:J=R);let xe=C[J];xe===void 0&&(xe={type:void 0,texture:void 0},C[J]=xe),(xe.type!==F||xe.texture!==ee)&&(R!==J&&(i.activeTexture(J),R=J),i.bindTexture(F,ee||Be[F]),xe.type=F,xe.texture=ee)}function k(){let F=C[R];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Ze(){try{i.compressedTexImage2D(...arguments)}catch(F){Ke("WebGLState:",F)}}function tt(){try{i.compressedTexImage3D(...arguments)}catch(F){Ke("WebGLState:",F)}}function Et(){try{i.texSubImage2D(...arguments)}catch(F){Ke("WebGLState:",F)}}function de(){try{i.texSubImage3D(...arguments)}catch(F){Ke("WebGLState:",F)}}function Mt(){try{i.compressedTexSubImage2D(...arguments)}catch(F){Ke("WebGLState:",F)}}function ke(){try{i.compressedTexSubImage3D(...arguments)}catch(F){Ke("WebGLState:",F)}}function Ye(){try{i.texStorage2D(...arguments)}catch(F){Ke("WebGLState:",F)}}function T(){try{i.texStorage3D(...arguments)}catch(F){Ke("WebGLState:",F)}}function E(){try{i.texImage2D(...arguments)}catch(F){Ke("WebGLState:",F)}}function V(){try{i.texImage3D(...arguments)}catch(F){Ke("WebGLState:",F)}}function ie(F){return f[F]!==void 0?f[F]:i.getParameter(F)}function ne(F,ee){f[F]!==ee&&(i.pixelStorei(F,ee),f[F]=ee)}function pe(F){q.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),q.copy(F))}function ve(F){le.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),le.copy(F))}function j(F,ee){let J=l.get(ee);J===void 0&&(J=new WeakMap,l.set(ee,J));let xe=J.get(F);xe===void 0&&(xe=i.getUniformBlockIndex(ee,F.name),i.uniformBlockBinding(ee,xe,xe),J.set(F,xe))}function Q(F,ee,J){let he=l.get(ee).get(F);c[he]!==J&&(i.bindBufferBase(i.UNIFORM_BUFFER,he,J),c[he]=J)}function ge(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},R=null,C={},u={},c={},d=new WeakMap,p=[],x=null,m=!1,g=null,_=null,y=null,M=null,w=null,b=null,v=null,S=new Ae(0,0,0),D=0,I=!1,O=null,G=null,Y=null,P=null,U=null,q.set(0,0,i.canvas.width,i.canvas.height),le.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ce,disable:Ie,bindFramebuffer:dt,drawBuffers:Pe,useProgram:je,setBlending:re,setMaterial:se,setFlipSided:we,setCullFace:ue,setLineWidth:Xe,setPolygonOffset:Ce,setScissorTest:nt,activeTexture:it,bindTexture:ct,unbindTexture:k,compressedTexImage2D:Ze,compressedTexImage3D:tt,texImage2D:E,texImage3D:V,pixelStorei:ne,getParameter:ie,updateUBOMapping:j,uniformBlockBinding:Q,texStorage2D:Ye,texStorage3D:T,texSubImage2D:Et,texSubImage3D:de,compressedTexSubImage2D:Mt,compressedTexSubImage3D:ke,scissor:pe,viewport:ve,reset:ge}}function uM(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ae,h=new WeakMap,f=new Set,u,d=new WeakMap,p=new Set,x=new FinalizationRegistry(T=>p.delete(T)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,E){return m?new OffscreenCanvas(T,E):wr("canvas")}function _(T,E,V){let ie=1,ne=Ye(T);if((ne.width>V||ne.height>V)&&(ie=V/Math.max(ne.width,ne.height)),ie<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let pe=Math.floor(ie*ne.width),ve=Math.floor(ie*ne.height);u===void 0&&(u=g(pe,ve));let j=E?g(pe,ve):u;return j.width=pe,j.height=ve,j.getContext("2d").drawImage(T,0,0,pe,ve),Oe("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+pe+"x"+ve+")."),j}else return"data"in T&&Oe("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),T;return T}function y(T){return T.generateMipmaps}function M(T){i.generateMipmap(T)}function w(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(T,E,V,ie,ne,pe=!1){if(T!==null){if(i[T]!==void 0)return i[T];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ve;ie&&(ve=e.get("EXT_texture_norm16"),ve||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=E;if(E===i.RED&&(V===i.FLOAT&&(j=i.R32F),V===i.HALF_FLOAT&&(j=i.R16F),V===i.UNSIGNED_BYTE&&(j=i.R8),V===i.UNSIGNED_SHORT&&ve&&(j=ve.R16_EXT),V===i.SHORT&&ve&&(j=ve.R16_SNORM_EXT)),E===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(j=i.R8UI),V===i.UNSIGNED_SHORT&&(j=i.R16UI),V===i.UNSIGNED_INT&&(j=i.R32UI),V===i.BYTE&&(j=i.R8I),V===i.SHORT&&(j=i.R16I),V===i.INT&&(j=i.R32I)),E===i.RG&&(V===i.FLOAT&&(j=i.RG32F),V===i.HALF_FLOAT&&(j=i.RG16F),V===i.UNSIGNED_BYTE&&(j=i.RG8),V===i.UNSIGNED_SHORT&&ve&&(j=ve.RG16_EXT),V===i.SHORT&&ve&&(j=ve.RG16_SNORM_EXT)),E===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(j=i.RG8UI),V===i.UNSIGNED_SHORT&&(j=i.RG16UI),V===i.UNSIGNED_INT&&(j=i.RG32UI),V===i.BYTE&&(j=i.RG8I),V===i.SHORT&&(j=i.RG16I),V===i.INT&&(j=i.RG32I)),E===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(j=i.RGB8UI),V===i.UNSIGNED_SHORT&&(j=i.RGB16UI),V===i.UNSIGNED_INT&&(j=i.RGB32UI),V===i.BYTE&&(j=i.RGB8I),V===i.SHORT&&(j=i.RGB16I),V===i.INT&&(j=i.RGB32I)),E===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),V===i.UNSIGNED_INT&&(j=i.RGBA32UI),V===i.BYTE&&(j=i.RGBA8I),V===i.SHORT&&(j=i.RGBA16I),V===i.INT&&(j=i.RGBA32I)),E===i.RGB&&(V===i.UNSIGNED_SHORT&&ve&&(j=ve.RGB16_EXT),V===i.SHORT&&ve&&(j=ve.RGB16_SNORM_EXT),V===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),E===i.RGBA){let Q=pe?wa:ht.getTransfer(ne);V===i.FLOAT&&(j=i.RGBA32F),V===i.HALF_FLOAT&&(j=i.RGBA16F),V===i.UNSIGNED_BYTE&&(j=Q===Tt?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT&&ve&&(j=ve.RGBA16_EXT),V===i.SHORT&&ve&&(j=ve.RGBA16_SNORM_EXT),V===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function v(T,E){let V;return T?E===null||E===ai||E===Js?V=i.DEPTH24_STENCIL8:E===Wn?V=i.DEPTH32F_STENCIL8:E===qr&&(V=i.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ai||E===Js?V=i.DEPTH_COMPONENT24:E===Wn?V=i.DEPTH_COMPONENT32F:E===qr&&(V=i.DEPTH_COMPONENT16),V}function S(T,E){return y(T)===!0||T.isFramebufferTexture&&T.minFilter!==Xt&&T.minFilter!==qt?Math.log2(Math.max(E.width,E.height))+1:T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?E.mipmaps.length:1}function D(T){let E=new WeakRef(T);n.get(T).__ref=E,p.add(E),x.register(T,E,E)}function I(T){let E=n.get(T).__ref;E!==void 0&&(p.delete(E),x.unregister(E))}function O(T){Y(T.target)}function G(T){P(T.target)}function Y(T){T.removeEventListener("dispose",O),I(T),H(T),T.isVideoTexture&&h.delete(T),T.isHTMLTexture&&f.delete(T)}function P(T){T.removeEventListener("dispose",G),I(T),K(T)}function U(){for(let T of p){let E=T.deref();E!==void 0&&(E.isRenderTarget===!0?P(E):Y(E))}p.clear(),f.clear()}function H(T){let E=n.get(T);if(E.__webglInit===void 0)return;let V=T.source,ie=d.get(V);if(ie){let ne=ie[E.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&L(T),Object.keys(ie).length===0&&d.delete(V)}n.remove(T)}function L(T){let E=n.get(T);i.deleteTexture(E.__webglTexture);let V=T.source,ie=d.get(V);delete ie[E.__cacheKey],a.memory.textures--}function K(T){let E=n.get(T);E.__depthDisposeCallback&&E.__depthDisposeCallback();let V=T.depthTexture;if(V&&V.renderTarget===T&&Y(V),T.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(E.__webglFramebuffer[ne]))for(let pe=0;pe<E.__webglFramebuffer[ne].length;pe++)i.deleteFramebuffer(E.__webglFramebuffer[ne][pe]);else i.deleteFramebuffer(E.__webglFramebuffer[ne]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[ne])}else{if(Array.isArray(E.__webglFramebuffer))for(let ne=0;ne<E.__webglFramebuffer.length;ne++)i.deleteFramebuffer(E.__webglFramebuffer[ne]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ne=0;ne<E.__webglColorRenderbuffer.length;ne++)E.__webglColorRenderbuffer[ne]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[ne]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let ie=T.textures;for(let ne=0,pe=ie.length;ne<pe;ne++){let ve=n.get(ie[ne]);ve.__webglTexture&&(i.deleteTexture(ve.__webglTexture),a.memory.textures--),n.remove(ie[ne])}n.remove(T)}let B=0;function R(){B=0}function C(){return B}function $(T){B=T}function Me(){let T=B;return T>=s.maxTextures&&Oe("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),B+=1,T}function q(T){let E=[];return E.push(T.wrapS),E.push(T.wrapT),E.push(T.wrapR||0),E.push(T.magFilter),E.push(T.minFilter),E.push(T.anisotropy),E.push(T.internalFormat),E.push(T.format),E.push(T.type),E.push(T.generateMipmaps),E.push(T.mipmapsAutoUpdate),E.push(T.premultiplyAlpha),E.push(T.flipY),E.push(T.unpackAlignment),E.push(T.colorSpace),E.join()}function le(T,E){let V=n.get(T);if(T.isVideoTexture&&Mt(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&V.__version!==T.version){let ie=T.image;if(ie===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{se(V,T,E);return}}else T.isExternalTexture&&(V.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+E)}function Ee(T,E){let V=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&V.__version!==T.version){se(V,T,E);return}else T.isExternalTexture&&(V.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+E)}function Be(T,E){let V=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&V.__version!==T.version){se(V,T,E);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+E)}function ce(T,E){let V=n.get(T);if(T.version>0&&V.__version!==T.version){we(V,T,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+E)}let Ie={[mi]:i.REPEAT,[Yn]:i.CLAMP_TO_EDGE,[Sr]:i.MIRRORED_REPEAT},dt={[Xt]:i.NEAREST,[Jl]:i.NEAREST_MIPMAP_NEAREST,[Ks]:i.NEAREST_MIPMAP_LINEAR,[qt]:i.LINEAR,[Xr]:i.LINEAR_MIPMAP_NEAREST,[Un]:i.LINEAR_MIPMAP_LINEAR},Pe={[kp]:i.NEVER,[Su]:i.ALWAYS,[Hp]:i.LESS,[Mu]:i.LEQUAL,[Gp]:i.EQUAL,[bu]:i.GEQUAL,[Vp]:i.GREATER,[Wp]:i.NOTEQUAL};function je(T,E){if(E.type===Wn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===qt||E.magFilter===Xr||E.magFilter===Ks||E.magFilter===Un||E.minFilter===qt||E.minFilter===Xr||E.minFilter===Ks||E.minFilter===Un)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,Ie[E.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Ie[E.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Ie[E.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,dt[E.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,dt[E.minFilter]),E.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Pe[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Xt||E.minFilter!==Ks&&E.minFilter!==Un||E.type===Wn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function et(T,E){let V=!1;T.__webglInit===void 0&&(T.__webglInit=!0,E.addEventListener("dispose",O),D(E));let ie=E.source,ne=d.get(ie);ne===void 0&&(ne={},d.set(ie,ne));let pe=q(E);if(pe!==T.__cacheKey){ne[pe]===void 0&&(ne[pe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,V=!0),ne[pe].usedTimes++;let ve=ne[T.__cacheKey];ve!==void 0&&(ne[T.__cacheKey].usedTimes--,ve.usedTimes===0&&L(E)),T.__cacheKey=pe,T.__webglTexture=ne[pe].texture}return V}function te(T,E,V){return Math.floor(Math.floor(T/V)/E)}function re(T,E,V,ie){let pe=T.updateRanges;if(pe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,E.width,E.height,V,ie,E.data);else{pe.sort((F,ee)=>F.start-ee.start);let ve=0;for(let F=1;F<pe.length;F++){let ee=pe[ve],J=pe[F],xe=ee.start+ee.count,he=te(J.start,E.width,4),me=te(ee.start,E.width,4);J.start<=xe+1&&he===me&&te(J.start+J.count-1,E.width,4)===he?ee.count=Math.max(ee.count,J.start+J.count-ee.start):(++ve,pe[ve]=J)}pe.length=ve+1;let j=t.getParameter(i.UNPACK_ROW_LENGTH),Q=t.getParameter(i.UNPACK_SKIP_PIXELS),ge=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,E.width);for(let F=0,ee=pe.length;F<ee;F++){let J=pe[F],xe=Math.floor(J.start/4),he=Math.ceil(J.count/4),me=xe%E.width,ze=Math.floor(xe/E.width),at=he,oe=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,me),t.pixelStorei(i.UNPACK_SKIP_ROWS,ze),t.texSubImage2D(i.TEXTURE_2D,0,me,ze,at,oe,V,ie,E.data)}T.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,j),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(i.UNPACK_SKIP_ROWS,ge)}}function se(T,E,V){let ie=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ie=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ie=i.TEXTURE_3D);let ne=et(T,E),pe=E.source;t.bindTexture(ie,T.__webglTexture,i.TEXTURE0+V);let ve=n.get(pe);if(pe.version!==ve.__version||ne===!0){if(t.activeTexture(i.TEXTURE0+V),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){let oe=ht.getPrimaries(ht.workingColorSpace),Ge=E.colorSpace===Yi?null:ht.getPrimaries(E.colorSpace),rt=E.colorSpace===Yi||oe===Ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt)}t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment);let Q=_(E.image,!1,s.maxTextureSize);Q=ke(E,Q);let ge=r.convert(E.format,E.colorSpace),F=r.convert(E.type),ee=b(E.internalFormat,ge,F,E.normalized,E.colorSpace,E.isVideoTexture);je(ie,E);let J,xe=E.mipmaps,he=E.isVideoTexture!==!0,me=ve.__version===void 0||ne===!0,ze=pe.dataReady,at=S(E,Q);if(E.isDepthTexture)ee=v(E.format===qi,E.type),me&&(he?t.texStorage2D(i.TEXTURE_2D,1,ee,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,ee,Q.width,Q.height,0,ge,F,null));else if(E.isDataTexture)if(xe.length>0){he&&me&&t.texStorage2D(i.TEXTURE_2D,at,ee,xe[0].width,xe[0].height);for(let oe=0,Ge=xe.length;oe<Ge;oe++)J=xe[oe],he?ze&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,J.width,J.height,ge,F,J.data):t.texImage2D(i.TEXTURE_2D,oe,ee,J.width,J.height,0,ge,F,J.data);E.generateMipmaps=!1}else he?(me&&t.texStorage2D(i.TEXTURE_2D,at,ee,Q.width,Q.height),ze&&re(E,Q,ge,F)):t.texImage2D(i.TEXTURE_2D,0,ee,Q.width,Q.height,0,ge,F,Q.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){he&&me&&t.texStorage3D(i.TEXTURE_2D_ARRAY,at,ee,xe[0].width,xe[0].height,Q.depth);for(let oe=0,Ge=xe.length;oe<Ge;oe++)if(J=xe[oe],E.format!==Kn)if(ge!==null)if(he){if(ze)if(E.layerUpdates.size>0){let rt=Du(J.width,J.height,E.format,E.type);for(let be of E.layerUpdates){let Rt=J.data.subarray(be*rt/J.data.BYTES_PER_ELEMENT,(be+1)*rt/J.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,be,J.width,J.height,1,ge,Rt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,J.width,J.height,Q.depth,ge,J.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,oe,ee,J.width,J.height,Q.depth,0,J.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else he?ze&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,J.width,J.height,Q.depth,ge,F,J.data):t.texImage3D(i.TEXTURE_2D_ARRAY,oe,ee,J.width,J.height,Q.depth,0,ge,F,J.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{he&&me&&t.texStorage2D(i.TEXTURE_2D,at,ee,xe[0].width,xe[0].height);for(let oe=0,Ge=xe.length;oe<Ge;oe++)J=xe[oe],E.format!==Kn?ge!==null?he?ze&&t.compressedTexSubImage2D(i.TEXTURE_2D,oe,0,0,J.width,J.height,ge,J.data):t.compressedTexImage2D(i.TEXTURE_2D,oe,ee,J.width,J.height,0,J.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?ze&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,J.width,J.height,ge,F,J.data):t.texImage2D(i.TEXTURE_2D,oe,ee,J.width,J.height,0,ge,F,J.data)}else if(E.isDataArrayTexture)if(he){if(me&&t.texStorage3D(i.TEXTURE_2D_ARRAY,at,ee,Q.width,Q.height,Q.depth),ze)if(E.layerUpdates.size>0){let oe=Du(Q.width,Q.height,E.format,E.type);for(let Ge of E.layerUpdates){let rt=Q.data.subarray(Ge*oe/Q.data.BYTES_PER_ELEMENT,(Ge+1)*oe/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ge,Q.width,Q.height,1,ge,F,rt)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ge,F,Q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ee,Q.width,Q.height,Q.depth,0,ge,F,Q.data);else if(E.isData3DTexture)he?(me&&t.texStorage3D(i.TEXTURE_3D,at,ee,Q.width,Q.height,Q.depth),ze&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ge,F,Q.data)):t.texImage3D(i.TEXTURE_3D,0,ee,Q.width,Q.height,Q.depth,0,ge,F,Q.data);else if(E.isFramebufferTexture){if(me)if(he)t.texStorage2D(i.TEXTURE_2D,at,ee,Q.width,Q.height);else{let oe=Q.width,Ge=Q.height;for(let rt=0;rt<at;rt++)t.texImage2D(i.TEXTURE_2D,rt,ee,oe,Ge,0,ge,F,null),oe>>=1,Ge>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in i){let oe=i.canvas;if(oe.hasAttribute("layoutsubtree")||oe.setAttribute("layoutsubtree","true"),Q.parentNode!==oe){oe.appendChild(Q),f.add(E),oe.onpaint=Ge=>{let rt=Ge.changedElements;for(let be of f)rt.includes(be.image)&&(be.needsUpdate=!0)},oe.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Q);else{let rt=i.RGBA,be=i.RGBA,Rt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,rt,be,Rt,Q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(xe.length>0){if(he&&me){let oe=Ye(xe[0]);t.texStorage2D(i.TEXTURE_2D,at,ee,oe.width,oe.height)}for(let oe=0,Ge=xe.length;oe<Ge;oe++)J=xe[oe],he?ze&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ge,F,J):t.texImage2D(i.TEXTURE_2D,oe,ee,ge,F,J);E.generateMipmaps=!1}else if(he){if(me){let oe=Ye(Q);t.texStorage2D(i.TEXTURE_2D,at,ee,oe.width,oe.height)}ze&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge,F,Q)}else t.texImage2D(i.TEXTURE_2D,0,ee,ge,F,Q);y(E)&&E.mipmapsAutoUpdate===!0&&M(ie),ve.__version=pe.version,E.onUpdate&&E.onUpdate(E)}T.__version=E.version}function we(T,E,V){if(E.image.length!==6)return;let ie=et(T,E),ne=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+V);let pe=n.get(ne);if(ne.version!==pe.__version||ie===!0){t.activeTexture(i.TEXTURE0+V);let ve=ht.getPrimaries(ht.workingColorSpace),j=E.colorSpace===Yi?null:ht.getPrimaries(E.colorSpace),Q=E.colorSpace===Yi||ve===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let ge=E.isCompressedTexture||E.image[0].isCompressedTexture,F=E.image[0]&&E.image[0].isDataTexture,ee=[];for(let be=0;be<6;be++)!ge&&!F?ee[be]=_(E.image[be],!0,s.maxCubemapSize):ee[be]=F?E.image[be].image:E.image[be],ee[be]=ke(E,ee[be]);let J=ee[0],xe=r.convert(E.format,E.colorSpace),he=r.convert(E.type),me=b(E.internalFormat,xe,he,E.normalized,E.colorSpace),ze=E.isVideoTexture!==!0,at=pe.__version===void 0||ie===!0,oe=ne.dataReady,Ge=S(E,J);je(i.TEXTURE_CUBE_MAP,E);let rt;if(E.isDepthTexture){if(me=v(E.format===qi,E.type),at)if(ze)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,me,J.width,J.height);else for(let be=0;be<6;be++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,me,J.width,J.height,0,xe,he,null)}else if(ge){ze&&at&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ge,me,J.width,J.height);for(let be=0;be<6;be++){rt=ee[be].mipmaps;for(let Rt=0;Rt<rt.length;Rt++){let an=rt[Rt];E.format!==Kn?xe!==null?ze?oe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Rt,0,0,an.width,an.height,xe,an.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Rt,me,an.width,an.height,0,an.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Rt,0,0,an.width,an.height,xe,he,an.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Rt,me,an.width,an.height,0,xe,he,an.data)}}}else{if(rt=E.mipmaps,ze&&at){rt.length>0&&Ge++;let be=Ye(ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ge,me,be.width,be.height)}for(let be=0;be<6;be++)if(F){ze?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,ee[be].width,ee[be].height,xe,he,ee[be].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,me,ee[be].width,ee[be].height,0,xe,he,ee[be].data);for(let Rt=0;Rt<rt.length;Rt++){let $i=rt[Rt].image[be].image;ze?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Rt+1,0,0,$i.width,$i.height,xe,he,$i.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Rt+1,me,$i.width,$i.height,0,xe,he,$i.data)}}else{ze?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,xe,he,ee[be]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,me,xe,he,ee[be]);for(let Rt=0;Rt<rt.length;Rt++){let an=rt[Rt];ze?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Rt+1,0,0,xe,he,an.image[be]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Rt+1,me,xe,he,an.image[be])}}}y(E)&&E.mipmapsAutoUpdate===!0&&M(i.TEXTURE_CUBE_MAP),pe.__version=ne.version,E.onUpdate&&E.onUpdate(E)}T.__version=E.version}function ue(T,E,V,ie,ne,pe){let ve=r.convert(V.format,V.colorSpace),j=r.convert(V.type),Q=b(V.internalFormat,ve,j,V.normalized,V.colorSpace),ge=n.get(E),F=n.get(V);if(F.__renderTarget=E,!ge.__hasExternalTextures){let ee=Math.max(1,E.width>>pe),J=Math.max(1,E.height>>pe);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,pe,Q,ee,J,E.depth,0,ve,j,null):t.texImage2D(ne,pe,Q,ee,J,0,ve,j,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),de(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,ne,F.__webglTexture,0,Et(E)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ie,ne,F.__webglTexture,pe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Xe(T,E,V){if(i.bindRenderbuffer(i.RENDERBUFFER,T),E.depthBuffer){let ie=E.depthTexture,ne=ie&&ie.isDepthTexture?ie.type:null,pe=v(E.stencilBuffer,ne),ve=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;de(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Et(E),pe,E.width,E.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,Et(E),pe,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,pe,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ve,i.RENDERBUFFER,T)}else{let ie=E.textures;for(let ne=0;ne<ie.length;ne++){let pe=ie[ne],ve=r.convert(pe.format,pe.colorSpace),j=r.convert(pe.type),Q=b(pe.internalFormat,ve,j,pe.normalized,pe.colorSpace);de(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Et(E),Q,E.width,E.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,Et(E),Q,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Q,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ce(T,E,V){let ie=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ne=n.get(E.depthTexture);ne.__renderTarget=E;let pe=ie?E.depthTexture.image[0]:E.depthTexture.image;(!ne.__webglTexture||pe.width!==E.width||pe.height!==E.height)&&(pe.width=E.width,pe.height=E.height,E.depthTexture.needsUpdate=!0),ie?ce(E.depthTexture,0):le(E.depthTexture,0);let ve=ne.__webglTexture,j=Et(E),Q=ie?i.TEXTURE_CUBE_MAP_POSITIVE_X+V:i.TEXTURE_2D,ge=E.depthTexture.format===qi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(E.depthTexture.format===Fi)de(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ge,Q,ve,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,ge,Q,ve,0);else if(E.depthTexture.format===qi)de(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ge,Q,ve,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,ge,Q,ve,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nt(T){let E=n.get(T),V=T.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==T.depthTexture){let ie=T.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ie){let ne=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ie.removeEventListener("dispose",ne)};ie.addEventListener("dispose",ne),E.__depthDisposeCallback=ne}E.__boundDepthTexture=ie}if(T.depthTexture&&!E.__autoAllocateDepthBuffer)if(V)for(let ie=0;ie<6;ie++)Ce(E.__webglFramebuffer[ie],T,ie);else T.texture.mipmaps.length>0?Ce(E.__webglFramebuffer[0],T,0):Ce(E.__webglFramebuffer,T,0);else if(V){E.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[ie]),E.__webglDepthbuffer[ie]===void 0)E.__webglDepthbuffer[ie]=i.createRenderbuffer(),Xe(E.__webglDepthbuffer[ie],T,!1);else{let ne=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=E.__webglDepthbuffer[ie];i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,pe)}}else if(T.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),Xe(E.__webglDepthbuffer,T,!1);else{let ne=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,pe)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function it(T,E,V){let ie=n.get(T);E!==void 0&&ue(ie.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&nt(T)}function ct(T){let E=T.texture,V=n.get(T),ie=n.get(E);T.addEventListener("dispose",G),D(T);let ne=T.textures,pe=T.isWebGLCubeRenderTarget===!0,ve=ne.length>1;if(ve||(ie.__webglTexture===void 0&&(ie.__webglTexture=i.createTexture()),ie.__version=E.version,a.memory.textures++),pe){V.__webglFramebuffer=[];for(let j=0;j<6;j++)if(E.mipmaps.length>0){V.__webglFramebuffer[j]=[];for(let Q=0;Q<E.mipmaps.length;Q++)V.__webglFramebuffer[j][Q]=i.createFramebuffer()}else V.__webglFramebuffer[j]=i.createFramebuffer()}else{if(E.mipmaps.length>0){V.__webglFramebuffer=[];for(let j=0;j<E.mipmaps.length;j++)V.__webglFramebuffer[j]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(ve)for(let j=0,Q=ne.length;j<Q;j++){let ge=n.get(ne[j]);ge.__webglTexture===void 0&&(ge.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&de(T)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let j=0;j<ne.length;j++){let Q=ne[j];V.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[j]);let ge=r.convert(Q.format,Q.colorSpace),F=r.convert(Q.type),ee=b(Q.internalFormat,ge,F,Q.normalized,Q.colorSpace,T.isXRRenderTarget===!0),J=Et(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,J,ee,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,V.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),Xe(V.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(pe){t.bindTexture(i.TEXTURE_CUBE_MAP,ie.__webglTexture),je(i.TEXTURE_CUBE_MAP,E);for(let j=0;j<6;j++)if(E.mipmaps.length>0)for(let Q=0;Q<E.mipmaps.length;Q++)ue(V.__webglFramebuffer[j][Q],T,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Q);else ue(V.__webglFramebuffer[j],T,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);y(E)?M(i.TEXTURE_CUBE_MAP):E.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),t.unbindTexture()}else if(ve){for(let j=0,Q=ne.length;j<Q;j++){let ge=ne[j],F=n.get(ge),ee=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ee=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ee,F.__webglTexture),je(ee,ge),ue(V.__webglFramebuffer,T,ge,i.COLOR_ATTACHMENT0+j,ee,0),y(ge)&&M(ee)}t.unbindTexture()}else{let j=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(j=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(j,ie.__webglTexture),je(j,E),E.mipmaps.length>0)for(let Q=0;Q<E.mipmaps.length;Q++)ue(V.__webglFramebuffer[Q],T,E,i.COLOR_ATTACHMENT0,j,Q);else ue(V.__webglFramebuffer,T,E,i.COLOR_ATTACHMENT0,j,0);y(E)?M(j):E.mipmaps.length>0&&i.texParameteri(j,i.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),t.unbindTexture()}T.depthBuffer&&nt(T)}function k(T){let E=T.textures;for(let V=0,ie=E.length;V<ie;V++){let ne=E[V];if(y(ne)&&ne.mipmapsAutoUpdate===!0){let pe=w(T),ve=n.get(ne).__webglTexture;t.bindTexture(pe,ve),M(pe),t.unbindTexture()}}}let Ze=[];function tt(T){if(T.samples>0){if(de(T)===!1){let E=T.textures,V=T.width,ie=T.height,ne=i.COLOR_BUFFER_BIT,pe=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=n.get(T),j=E.length>1;if(j)for(let ge=0;ge<E.length;ge++)t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer),T.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let ge=0;ge<E.length;ge++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ve.__webglColorRenderbuffer[ge]);let F=n.get(E[ge]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,F,0)}i.blitFramebuffer(0,0,V,ie,0,0,V,ie,ne,i.NEAREST),c===!0&&(Ze.length=0,Ze.push(i.COLOR_ATTACHMENT0+ge),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&Ze.push(pe),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ze))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let ge=0;ge<E.length;ge++){t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,ve.__webglColorRenderbuffer[ge]);let F=n.get(E[ge]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,F,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&c){let E=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function Et(T){return Math.min(s.maxSamples,T.samples)}function de(T){let E=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Mt(T){let E=a.render.frame;h.get(T)!==E&&(h.set(T,E),T.update())}function ke(T,E){let V=T.colorSpace,ie=T.format,ne=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||V!==Rn&&V!==Yi&&(ht.getTransfer(V)===Tt?(ie!==Kn||ne!==Fn)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ke("WebGLTextures: Unsupported texture color space:",V)),E}function Ye(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=Me,this.resetTextureUnits=R,this.getTextureUnits=C,this.setTextureUnits=$,this.setTexture2D=le,this.setTexture2DArray=Ee,this.setTexture3D=Be,this.setTextureCube=ce,this.rebindTextures=it,this.setupRenderTarget=ct,this.updateRenderTargetMipmap=k,this.updateMultisampleRenderTarget=tt,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=de,this.dispose=U}function fM(i,e){function t(n,s=Yi){let r,a=ht.getTransfer(s);if(n===Fn)return i.UNSIGNED_BYTE;if(n===jl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ql)return i.UNSIGNED_SHORT_5_5_5_1;if(n===gu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===xu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===pu)return i.BYTE;if(n===mu)return i.SHORT;if(n===qr)return i.UNSIGNED_SHORT;if(n===$l)return i.INT;if(n===ai)return i.UNSIGNED_INT;if(n===Wn)return i.FLOAT;if(n===oi)return i.HALF_FLOAT;if(n===_u)return i.ALPHA;if(n===vu)return i.RGB;if(n===Kn)return i.RGBA;if(n===Fi)return i.DEPTH_COMPONENT;if(n===qi)return i.DEPTH_STENCIL;if(n===ec)return i.RED;if(n===tc)return i.RED_INTEGER;if(n===ps)return i.RG;if(n===nc)return i.RG_INTEGER;if(n===ic)return i.RGBA_INTEGER;if(n===lo||n===co||n===ho||n===uo)if(a===Tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===lo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===lo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===co)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ho)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===uo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===sc||n===rc||n===ac||n===oc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===sc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===rc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ac)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===oc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===lc||n===cc||n===hc||n===uc||n===fc||n===fo||n===dc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===lc||n===cc)return a===Tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===hc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===uc)return r.COMPRESSED_R11_EAC;if(n===fc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===fo)return r.COMPRESSED_RG11_EAC;if(n===dc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===pc||n===mc||n===gc||n===xc||n===_c||n===vc||n===yc||n===Mc||n===bc||n===Sc||n===Ec||n===wc||n===Tc||n===Ac)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===pc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===mc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===gc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===xc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===_c)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===vc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===yc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Mc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Sc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ec)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===wc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Tc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ac)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Rc||n===Cc||n===Ic)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Rc)return a===Tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Cc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ic)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Pc||n===Lc||n===po||n===Nc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Pc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Lc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===po)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Nc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Js?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var dM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,pM=`
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

}`,Zu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new za(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new kt({vertexShader:dM,fragmentShader:pM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qe(new zt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ku=class extends gi{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,u=null,d=null,p=null,x=typeof XRWebGLBinding<"u",m=new Zu,g={},_=t.getContextAttributes(),y=null,M=null,w=[],b=[],v=new ae,S=null,D=null,I=new Qt;I.viewport=new _t;let O=new Qt;O.viewport=new _t;let G=[I,O],Y=new ql,P=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let le=w[q];return le===void 0&&(le=new Rr,w[q]=le),le.getTargetRaySpace()},this.getControllerGrip=function(q){let le=w[q];return le===void 0&&(le=new Rr,w[q]=le),le.getGripSpace()},this.getHand=function(q){let le=w[q];return le===void 0&&(le=new Rr,w[q]=le),le.getHandSpace()};function H(q){let le=b.indexOf(q.inputSource);if(le===-1)return;let Ee=w[le];Ee!==void 0&&(Ee.update(q.inputSource,q.frame,l||a),Ee.dispatchEvent({type:q.type,data:q.inputSource}))}function L(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",L),s.removeEventListener("inputsourceschange",K);for(let q=0;q<w.length;q++){let le=b[q];le!==null&&(b[q]=null,w[q].disconnect(le))}P=null,U=null,m.reset();for(let q in g)delete g[q];if(e.setRenderTarget(y),d=null,u=null,f=null,s=null,M=null,Me.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(v.width,v.height,!1),D!==null){let q=D.camera;q.fov=D.fov,q.zoom=D.zoom,q.updateProjectionMatrix(),D=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",L),s.addEventListener("inputsourceschange",K),_.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(v),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ee=null,Be=null,ce=null;_.depth&&(ce=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ee=_.stencil?qi:Fi,Be=_.stencil?Js:ai);let Ie={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Ie),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new kn(u.textureWidth,u.textureHeight,{format:Kn,type:Fn,depthTexture:new Oi(u.textureWidth,u.textureHeight,Be,void 0,void 0,void 0,void 0,void 0,void 0,Ee),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let Ee={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,Ee),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new kn(d.framebufferWidth,d.framebufferHeight,{format:Kn,type:Fn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Me.setContext(s),Me.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function K(q){for(let le=0;le<q.removed.length;le++){let Ee=q.removed[le],Be=b.indexOf(Ee);Be>=0&&(b[Be]=null,w[Be].disconnect(Ee))}for(let le=0;le<q.added.length;le++){let Ee=q.added[le],Be=b.indexOf(Ee);if(Be===-1){for(let Ie=0;Ie<w.length;Ie++)if(Ie>=b.length){b.push(Ee),Be=Ie;break}else if(b[Ie]===null){b[Ie]=Ee,Be=Ie;break}if(Be===-1)break}let ce=w[Be];ce&&ce.connect(Ee)}}function B(q,le){le===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(le.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let le=q.near,Ee=q.far;m.texture!==null&&(m.depthNear>0&&(le=m.depthNear),m.depthFar>0&&(Ee=m.depthFar)),Y.near=O.near=I.near=le,Y.far=O.far=I.far=Ee,(P!==Y.near||U!==Y.far)&&(s.updateRenderState({depthNear:Y.near,depthFar:Y.far}),P=Y.near,U=Y.far),Y.layers.mask=q.layers.mask|6,I.layers.mask=Y.layers.mask&-5,O.layers.mask=Y.layers.mask&-3;let Be=q.parent,ce=Y.cameras;B(Y,Be);for(let Ie=0;Ie<ce.length;Ie++)B(ce[Ie],Be);Y.projectionMatrix.copy(I.projectionMatrix),Y.projectionMatrixInverse.copy(I.projectionMatrixInverse),D===null&&q.isPerspectiveCamera&&(D={camera:q,fov:q.fov,zoom:q.zoom}),R(q,Y,Be)};function R(q,le,Ee){Ee===null?q.matrix.copy(le.matrixWorld):(q.matrix.copy(Ee.matrixWorld),q.matrix.invert(),q.matrix.multiply(le.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(le.projectionMatrix),q.projectionMatrixInverse.copy(le.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Fs*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return Y},this.getFoveation=function(){if(!(u===null&&d===null))return c},this.setFoveation=function(q){c=q,u!==null&&(u.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(Y)},this.getCameraTexture=function(q){return g[q]};let C=null;function $(q,le){if(h=le.getViewerPose(l||a),p=le,h!==null){let Ee=h.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let Be=!1;Ee.length!==Y.cameras.length&&(Y.cameras.length=0,Be=!0);for(let Pe=0;Pe<Ee.length;Pe++){let je=Ee[Pe],et=null;if(d!==null)et=d.getViewport(je);else{let re=f.getViewSubImage(u,je);et=re.viewport,Pe===0&&(e.setRenderTargetTextures(M,re.colorTexture,re.depthStencilTexture),e.setRenderTarget(M))}let te=G[Pe];te===void 0&&(te=new Qt,te.layers.enable(Pe),te.viewport=new _t,G[Pe]=te),te.matrix.fromArray(je.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(je.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(et.x,et.y,et.width,et.height),Pe===0&&(Y.matrix.copy(te.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale)),Be===!0&&Y.cameras.push(te)}let ce=s.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=n.getBinding();let Pe=f.getDepthInformation(Ee[0]);Pe&&Pe.isValid&&Pe.texture&&m.init(Pe,s.renderState)}if(ce&&ce.includes("camera-access")&&x){e.state.unbindTexture(),f=n.getBinding();for(let Pe=0;Pe<Ee.length;Pe++){let je=Ee[Pe].camera;if(je){let et=g[je];et||(et=new za,g[je]=et);let te=f.getCameraImage(je);et.sourceTexture=te}}}}for(let Ee=0;Ee<w.length;Ee++){let Be=b[Ee],ce=w[Ee];Be!==null&&ce!==void 0&&ce.update(Be,le,l||a)}C&&C(q,le),le.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:le}),p=null}let Me=new E0;Me.setAnimationLoop($),this.setAnimationLoop=function(q){C=q},this.dispose=function(){}}},mM=new We,D0=new Je;D0.set(-1,0,0,0,1,0,0,0,1);function gM(i,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,Pu(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,_,y,M){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),f(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),u(m,g),g.isMeshPhysicalMaterial&&d(m,g,M)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),x(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?c(m,g,_,y):g.isSpriteMaterial?l(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===In&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===In&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let _=e.get(g),y=_.envMap,M=_.envMapRotation;y&&(m.envMap.value=y,m.envMapRotation.value.setFromMatrix4(mM.makeRotationFromEuler(M)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(D0),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,_,y){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*_,m.scale.value=y*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function u(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,_){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,t(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===In&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function x(m,g){let _=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function xM(i,e,t,n){let s={},r={};function a(_,y){let M=y.program;n.uniformBlockBinding(_,M,s[_.id])}function o(_,y){let M=s[_.id];M===void 0&&(p(_),M=c(_),s[_.id]=M,_.addEventListener("dispose",m));let w=y.program;n.updateUBOMapping(_,w);let b=e.render.frame;r[_.id]!==b&&(l(_),r[_.id]=b)}function c(_){let y=i.createBuffer(),M=_.__size,w=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,M,w),i.bindBuffer(i.UNIFORM_BUFFER,null),y}function l(_){let y=s[_.id],M=_.uniforms,w=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let b=0,v=M.length;b<v;b++){let S=M[b];if(Array.isArray(S))for(let D=0,I=S.length;D<I;D++)h(S[D],b,D,w);else h(S,b,0,w)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(_,y,M,w){if(u(_,y,M,w)===!0){let b=_.__offset,v=_.value;if(Array.isArray(v)){let S=0;for(let D=0;D<v.length;D++){let I=v[D],O=x(I,!0);f(I,_.__data,S),S+=O.storage/Float32Array.BYTES_PER_ELEMENT}}else f(v,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,b,_.__data)}}function f(_,y,M){typeof _=="number"||typeof _=="boolean"?y[M]=_:_.isMatrix3?(y[M]=_.elements[0],y[M+1]=_.elements[1],y[M+2]=_.elements[2],y[M+3]=0,y[M+4]=_.elements[3],y[M+5]=_.elements[4],y[M+6]=_.elements[5],y[M+7]=0,y[M+8]=_.elements[6],y[M+9]=_.elements[7],y[M+10]=_.elements[8],y[M+11]=0):ArrayBuffer.isView(_)?y.set(_.subarray(0,y.length-M),M):_.toArray(y,M)}function u(_,y,M,w){let b=_.value,v=y+"_"+M;if(Array.isArray(b)){w[v]===void 0&&(w[v]=[]);let S=w[v],D=!1;for(let I=0;I<b.length;I++)d(b[I],S,I)===!0&&(D=!0);return D}return d(b,w,v)}function d(_,y,M){if(y[M]===void 0)return typeof _=="number"||typeof _=="boolean"?y[M]=_:ArrayBuffer.isView(_)?y[M]=_.slice():y[M]=_.clone(),!0;{let w=y[M];if(typeof _=="number"||typeof _=="boolean"){if(w!==_)return y[M]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(w.equals(_)===!1)return w.copy(_),!0}}return!1}function p(_){let y=_.uniforms,M=0,w=16;for(let v=0,S=y.length;v<S;v++){let D=Array.isArray(y[v])?y[v]:[y[v]];for(let I=0,O=D.length;I<O;I++){let G=D[I],Y=Array.isArray(G.value)?G.value:[G.value],P=Array.isArray(y[v])||Array.isArray(G.value),U=M;for(let L=0,K=Y.length;L<K;L++){let B=Y[L],R=x(B,P),C=M%w,$=C%R.boundary,Me=C+$;M+=$,Me!==0&&w-Me<R.storage&&(M+=w-Me),L===0&&(U=M),M+=R.storage}let H=G.type==="int"?Int32Array:G.type==="uint"?Uint32Array:Float32Array;G.__data=new H((M-U)/Float32Array.BYTES_PER_ELEMENT),G.__offset=U}}let b=M%w;return b>0&&(M+=w-b),_.__size=M,_.__cache={},this}function x(_,y){let M={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(M.boundary=4,M.storage=4):_.isVector2?(M.boundary=8,M.storage=8):_.isVector3||_.isColor?(M.boundary=16,M.storage=12):_.isVector4?(M.boundary=16,M.storage=16):_.isMatrix3?(M.boundary=16,M.storage=48):_.isMatrix4?(M.boundary=16,M.storage=64):_.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(M.boundary=16,M.storage=_.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",_),y===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function m(_){let y=_.target;y.removeEventListener("dispose",m),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function g(){for(let _ in s)i.deleteBuffer(s[_]);s={},r={}}return{bind:a,update:o,dispose:g}}var _M=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Mi=null;function vM(){return Mi===null&&(Mi=new Lr(_M,16,16,ps,oi),Mi.name="DFG_LUT",Mi.minFilter=qt,Mi.magFilter=qt,Mi.wrapS=Yn,Mi.wrapT=Yn,Mi.generateMipmaps=!1,Mi.needsUpdate=!0),Mi}var Bc=class{constructor(e={}){let{canvas:t=Xp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=Fn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let x=d,m=new Set([ic,nc,tc]),g=new Set([Fn,ai,qr,Js,jl,Ql]),_=new Uint32Array(4),y=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]},w=null,b=null,v=[],S=[],D=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,O=!1,G=null,Y=null,P=null,U=null;this._outputColorSpace=xt;let H=0,L=0,K=null,B=-1,R=null,C=new _t,$=new _t,Me=null,q=new Ae(0),le=0,Ee=t.width,Be=t.height,ce=1,Ie=null,dt=null,Pe=new _t(0,0,Ee,Be),je=new _t(0,0,Ee,Be),et=!1,te=new cs,re=new Rl,se=!1,we=!1,ue=new We,Xe=new N,Ce=new _t,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},it=!1;function ct(){return K===null?ce:1}let k=n;function Ze(A,z){return t.getContext(A,z)}let tt,Et,de,Mt,ke,Ye,T,E,V,ie,ne,pe,ve,j,Q,ge,F,ee,J,xe,he,me,ze;try{let A={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Ge,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",be,!1),k===null){let z="webgl2";if(k=Ze(z,A),k===null)throw Ze(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}at()}catch(A){throw t.removeEventListener("webglcontextlost",Ge,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",be,!1),Ke("WebGLRenderer: "+A.message),A}function at(){tt=new I1(k),tt.init(),he=new fM(k,tt),Et=new v1(k,tt,e,he),de=new hM(k,tt),Et.reversedDepthBuffer&&u&&de.buffers.depth.setReversed(!0),Y=k.createFramebuffer(),P=k.createFramebuffer(),U=k.createFramebuffer(),Mt=new N1(k),ke=new Jy,Ye=new uM(k,tt,de,ke,Et,he,Mt),T=new C1(I),E=new Ux(k),me=new x1(k,E),V=new P1(k,E,Mt,me),ie=new U1(k,V,E,me,Mt),ee=new D1(k,Et,Ye),Q=new y1(ke),ne=new Ky(I,T,tt,Et,me,Q),pe=new gM(I,ke),ve=new jy,j=new sM(tt),F=new g1(I,T,de,ie,p,c),ge=new cM(I,ie,Et),ze=new xM(k,Mt,Et,de),J=new _1(k,tt,Mt),xe=new L1(k,tt,Mt),Mt.programs=ne.programs,I.capabilities=Et,I.extensions=tt,I.properties=ke,I.renderLists=ve,I.shadowMap=ge,I.state=de,I.info=Mt}x!==Fn&&(D=new O1(x,t.width,t.height,o,s,r));let oe=new Ku(I,k);this.xr=oe,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let A=tt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=tt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(A){A!==void 0&&(ce=A,this.setSize(Ee,Be,!1))},this.getSize=function(A){return A.set(Ee,Be)},this.setSize=function(A,z,Z=!0){if(oe.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}Ee=A,Be=z,t.width=Math.floor(A*ce),t.height=Math.floor(z*ce),Z===!0&&(t.style.width=A+"px",t.style.height=z+"px"),D!==null&&D.setSize(t.width,t.height),this.setViewport(0,0,A,z)},this.getDrawingBufferSize=function(A){return A.set(Ee*ce,Be*ce).floor()},this.setDrawingBufferSize=function(A,z,Z){Ee=A,Be=z,ce=Z,t.width=Math.floor(A*Z),t.height=Math.floor(z*Z),this.setViewport(0,0,A,z)},this.setEffects=function(A){if(x===Fn){Ke("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let z=0;z<A.length;z++)if(A[z].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(C)},this.getViewport=function(A){return A.copy(Pe)},this.setViewport=function(A,z,Z,W){A.isVector4?Pe.set(A.x,A.y,A.z,A.w):Pe.set(A,z,Z,W),de.viewport(C.copy(Pe).multiplyScalar(ct()).round())},this.getScissor=function(A){return A.copy(je)},this.setScissor=function(A,z,Z,W){A.isVector4?je.set(A.x,A.y,A.z,A.w):je.set(A,z,Z,W),de.scissor($.copy(je).multiplyScalar(ct()).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(A){de.setScissorTest(et=A)},this.setOpaqueSort=function(A){Ie=A},this.setTransparentSort=function(A){dt=A},this.getClearColor=function(A){return A.copy(F.getClearColor())},this.setClearColor=function(){F.setClearColor(...arguments)},this.getClearAlpha=function(){return F.getClearAlpha()},this.setClearAlpha=function(){F.setClearAlpha(...arguments)},this.clear=function(A=!0,z=!0,Z=!0){let W=0;if(A){let X=!1;if(K!==null){let ye=K.texture.format;X=m.has(ye)}if(X){let ye=K.texture.type,Le=g.has(ye),_e=F.getClearColor(),Te=F.getClearAlpha(),Fe=_e.r,st=_e.g,pt=_e.b;Le?(_[0]=Fe,_[1]=st,_[2]=pt,_[3]=Te,k.clearBufferuiv(k.COLOR,0,_)):(y[0]=Fe,y[1]=st,y[2]=pt,y[3]=Te,k.clearBufferiv(k.COLOR,0,y))}else W|=k.COLOR_BUFFER_BIT}z&&(W|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(W|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&k.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),G=A},this.dispose=function(){t.removeEventListener("webglcontextlost",Ge,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",be,!1),F.dispose(),ve.dispose(),j.dispose(),Ye.dispose(),ke.dispose(),T.dispose(),ie.dispose(),V.dispose(),me.dispose(),ze.dispose(),ne.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Qf),oe.removeEventListener("sessionend",ed),Ss.stop()};function Ge(A){A.preventDefault(),Ta("WebGLRenderer: Context Lost."),O=!0}function rt(){Ta("WebGLRenderer: Context Restored."),O=!1;let A=Mt.autoReset,z=ge.enabled,Z=ge.autoUpdate,W=ge.needsUpdate,X=ge.type;at(),Mt.autoReset=A,ge.enabled=z,ge.autoUpdate=Z,ge.needsUpdate=W,ge.type=X}function be(A){Ke("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Rt(A){let z=A.target;z.removeEventListener("dispose",Rt),an(z)}function an(A){$i(A),ke.remove(A)}function $i(A){let z=ke.get(A).programs;z!==void 0&&(z.forEach(function(Z){ne.releaseProgram(Z)}),A.isShaderMaterial&&ne.releaseShaderCache(A))}this.renderBufferDirect=function(A,z,Z,W,X,ye){z===null&&(z=nt);let Le=X.isMesh&&X.matrixWorld.determinantAffine()<0,_e=Ym(A,z,Z,W,X);de.setMaterial(W,Le);let Te=Z.index,Fe=1;if(W.wireframe===!0){if(Te=V.getWireframeAttribute(Z),Te===void 0)return;Fe=2}let st=Z.drawRange,pt=Z.attributes.position,De=st.start*Fe,mt=(st.start+st.count)*Fe;ye!==null&&(De=Math.max(De,ye.start*Fe),mt=Math.min(mt,(ye.start+ye.count)*Fe)),Te!==null?(De=Math.max(De,0),mt=Math.min(mt,Te.count)):pt!=null&&(De=Math.max(De,0),mt=Math.min(mt,pt.count));let Yt=mt-De;if(Yt<0||Yt===1/0)return;me.setup(X,W,_e,Z,Te);let Ft,Nt=J;if(Te!==null&&(Ft=E.get(Te),Nt=xe,Nt.setIndex(Ft)),X.isMesh)W.wireframe===!0?(de.setLineWidth(W.wireframeLinewidth*ct()),Nt.setMode(k.LINES)):Nt.setMode(k.TRIANGLES);else if(X.isLine){let mn=W.linewidth;mn===void 0&&(mn=1),de.setLineWidth(mn*ct()),X.isLineSegments?Nt.setMode(k.LINES):X.isLineLoop?Nt.setMode(k.LINE_LOOP):Nt.setMode(k.LINE_STRIP)}else X.isPoints?Nt.setMode(k.POINTS):X.isSprite&&Nt.setMode(k.TRIANGLES);if(X.isBatchedMesh)if(tt.get("WEBGL_multi_draw"))Nt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{let mn=X._multiDrawStarts,Ue=X._multiDrawCounts,wn=X._multiDrawCount,St=Te?E.get(Te).bytesPerElement:1,Es=ke.get(W).currentProgram.getUniforms();for(let gn=0;gn<wn;gn++)Es.setValue(k,"_gl_DrawID",gn),Nt.render(mn[gn]/St,Ue[gn])}else if(X.isInstancedMesh)Nt.renderInstances(De,Yt,X.count);else if(Z.isInstancedBufferGeometry){let mn=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ue=Math.min(Z.instanceCount,mn);Nt.renderInstances(De,Yt,Ue)}else Nt.render(De,Yt)};function jf(A,z,Z,W){G!==null&&A.isNodeMaterial&&G.setObject(W,A),se===!0&&Q.setState(A,Z,!1),A.transparent===!0&&A.side===Ht&&A.forceSinglePass===!1?(A.side=In,A.needsUpdate=!0,oa(A,z,W),A.side=vi,A.needsUpdate=!0,oa(A,z,W),A.side=Ht):oa(A,z,W)}this.compile=function(A,z,Z=null){Z===null&&(Z=A),G!==null&&G.renderStart(A,z,Z),b=j.get(Z),b.init(z),S.push(b),Z.traverseVisible(function(X){X.isLight&&X.layers.test(z.layers)&&(b.pushLight(X),X.castShadow&&b.pushShadow(X))}),A!==Z&&A.traverseVisible(function(X){X.isLight&&X.layers.test(z.layers)&&(b.pushLight(X),X.castShadow&&b.pushShadow(X))}),b.setupLights(),G!==null&&G.updateLights(b.state.lightsArray),we=this.localClippingEnabled,se=Q.init(this.clippingPlanes,we),se===!0&&Q.setGlobalState(this.clippingPlanes,z),G!==null&&ge.render(b.state.shadowsArray,Z,z);let W=new Set;return A.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;let ye=X.material;if(ye)if(Array.isArray(ye))for(let Le=0;Le<ye.length;Le++){let _e=ye[Le];jf(_e,Z,z,X),W.add(_e)}else jf(ye,Z,z,X),W.add(ye)}),b=S.pop(),G!==null&&G.renderEnd(),W},this.compileAsync=function(A,z,Z=null){let W=this.compile(A,z,Z);return new Promise(X=>{function ye(){if(W.forEach(function(Le){let Te=ke.get(Le).currentProgram;(Te===void 0||Te.isReady())&&W.delete(Le)}),W.size===0){X(A);return}setTimeout(ye,10)}tt.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let sh=null;function Xm(A){sh&&sh(A)}function Qf(){Ss.stop()}function ed(){Ss.start()}let Ss=new E0;Ss.setAnimationLoop(Xm),typeof self<"u"&&Ss.setContext(self),this.setAnimationLoop=function(A){sh=A,oe.setAnimationLoop(A),A===null?Ss.stop():Ss.start()},oe.addEventListener("sessionstart",Qf),oe.addEventListener("sessionend",ed),this.render=function(A,z){if(z!==void 0&&z.isCamera!==!0){Ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;G!==null&&G.renderStart(A,z);let Z=oe.enabled===!0&&oe.isPresenting===!0,W=D!==null&&(K===null||Z)&&D.begin(I,K);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(z),z=oe.getCamera()),A.isScene===!0&&A.onBeforeRender(I,A,z,K),b=j.get(A,S.length),b.init(z),b.state.textureUnits=Ye.getTextureUnits(),S.push(b),ue.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),z.isArrayCamera?re.setFromArrayCamera(z):te.setFromProjectionMatrix(ue,Zn,z.reversedDepth),we=this.localClippingEnabled,se=Q.init(this.clippingPlanes,we),w=ve.get(A,v.length),w.init(),v.push(w),this.info.render.frame++,oe.enabled===!0&&oe.isPresenting===!0){let Le=I.xr.getDepthSensingMesh();Le!==null&&rh(Le,z,-1/0,I.sortObjects)}rh(A,z,0,I.sortObjects),w.finish(),G!==null&&G.updateLights(b.state.lightsArray),I.sortObjects===!0&&w.sort(Ie,dt),it=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,it&&F.addToRenderList(w,A),this.info.autoReset===!0&&this.info.reset(),se===!0&&Q.beginShadows();let X=b.state.shadowsArray;if(ge.render(X,A,z),se===!0&&Q.endShadows(),(W&&D.hasRenderPass())===!1){let Le=w.opaque,_e=w.transmissive;if(b.setupLights(),z.isArrayCamera){let Te=z.cameras;if(_e.length>0)for(let Fe=0,st=Te.length;Fe<st;Fe++){let pt=Te[Fe];nd(Le,_e,A,pt)}it&&F.render(A);for(let Fe=0,st=Te.length;Fe<st;Fe++){let pt=Te[Fe];td(w,A,pt,pt.viewport)}}else _e.length>0&&nd(Le,_e,A,z),it&&F.render(A),td(w,A,z)}K!==null&&L===0&&(Ye.updateMultisampleRenderTarget(K),Ye.updateRenderTargetMipmap(K)),W&&D.end(I),A.isScene===!0&&A.onAfterRender(I,A,z),me.resetDefaultState(),B=-1,R=null,S.pop(),S.length>0?(b=S[S.length-1],Ye.setTextureUnits(b.state.textureUnits),se===!0&&Q.setGlobalState(I.clippingPlanes,b.state.camera)):b=null,v.pop(),v.length>0?w=v[v.length-1]:w=null,G!==null&&G.renderEnd()};function rh(A,z,Z,W){if(A.visible===!1)return;if(A.layers.test(z.layers)){if(A.isGroup)Z=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(z);else if(A.isLight)b.pushLight(A),A.castShadow&&b.pushShadow(A);else if(A.isSprite){let Le=z.isArrayCamera?re:te;if(!A.frustumCulled||A.intersectsFrustum(Le)){W&&Ce.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ue);let _e=ie.update(A),Te=A.material;Te.visible&&w.push(A,_e,Te,Z,Ce.z,null,z)}}else if(A.isMesh||A.isLine||A.isPoints){let Le=z.isArrayCamera?re:te;if(!A.frustumCulled||A.intersectsFrustum(Le)){let _e=ie.update(A),Te=A.material;if(W&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ce.copy(A.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Ce.copy(_e.boundingSphere.center)),Ce.applyMatrix4(A.matrixWorld).applyMatrix4(ue)),Array.isArray(Te)){let Fe=_e.groups;for(let st=0,pt=Fe.length;st<pt;st++){let De=Fe[st],mt=Te[De.materialIndex];mt&&mt.visible&&w.push(A,_e,mt,Z,Ce.z,De,z)}}else Te.visible&&w.push(A,_e,Te,Z,Ce.z,null,z)}}}let ye=A.children;for(let Le=0,_e=ye.length;Le<_e;Le++)rh(ye[Le],z,Z,W)}function td(A,z,Z,W){let{opaque:X,transmissive:ye,transparent:Le}=A;b.setupLightsView(Z),se===!0&&Q.setGlobalState(I.clippingPlanes,Z),W&&de.viewport(C.copy(W)),X.length>0&&Co(X,z,Z),ye.length>0&&Co(ye,z,Z),Le.length>0&&Co(Le,z,Z),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function nd(A,z,Z,W){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[W.id]===void 0){let De=tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[W.id]=new kn(1,1,{generateMipmaps:!0,type:De?oi:Fn,minFilter:Un,samples:Math.max(4,Et.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ht.workingColorSpace})}let ye=b.state.transmissionRenderTarget[W.id],Le=W.viewport||C;ye.setSize(Le.z*I.transmissionResolutionScale,Le.w*I.transmissionResolutionScale);let _e=I.getRenderTarget(),Te=I.getActiveCubeFace(),Fe=I.getActiveMipmapLevel();I.setRenderTarget(ye),I.getClearColor(q),le=I.getClearAlpha(),le<1&&I.setClearColor(16777215,.5),I.clear(),it&&F.render(Z);let st=I.toneMapping;I.toneMapping=yi;let pt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),b.setupLightsView(W),se===!0&&Q.setGlobalState(I.clippingPlanes,W),Co(A,Z,W),Ye.updateMultisampleRenderTarget(ye),Ye.updateRenderTargetMipmap(ye),tt.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let mt=0,Yt=z.length;mt<Yt;mt++){let Ft=z[mt],{object:Nt,geometry:mn,material:Ue,group:wn}=Ft;if(Ue.side===Ht&&Nt.layers.test(W.layers)){let St=Ue.side;Ue.side=In,Ue.needsUpdate=!0,id(Nt,Z,W,mn,Ue,wn),Ue.side=St,Ue.needsUpdate=!0,De=!0}}De===!0&&(Ye.updateMultisampleRenderTarget(ye),Ye.updateRenderTargetMipmap(ye))}I.setRenderTarget(_e,Te,Fe),I.setClearColor(q,le),pt!==void 0&&(W.viewport=pt),I.toneMapping=st}function Co(A,z,Z){let W=z.isScene===!0?z.overrideMaterial:null;for(let X=0,ye=A.length;X<ye;X++){let Le=A[X],{object:_e,geometry:Te,group:Fe}=Le,st=Le.material;st.allowOverride===!0&&W!==null&&(st=W),_e.layers.test(Z.layers)&&id(_e,z,Z,Te,st,Fe)}}function id(A,z,Z,W,X,ye){G!==null&&X.isNodeMaterial&&G.setObject(A,X),A.onBeforeRender(I,z,Z,W,X,ye),A.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),X.onBeforeRender(I,z,Z,W,A,ye),X.transparent===!0&&X.side===Ht&&X.forceSinglePass===!1?(X.side=In,X.needsUpdate=!0,I.renderBufferDirect(Z,z,W,X,A,ye),X.side=vi,X.needsUpdate=!0,I.renderBufferDirect(Z,z,W,X,A,ye),X.side=Ht):I.renderBufferDirect(Z,z,W,X,A,ye),A.onAfterRender(I,z,Z,W,X,ye)}function sd(A){let z=0;for(let Z of A)Z.texture!==null&&z++;return z}function oa(A,z,Z){z.isScene!==!0&&(z=nt);let W=ke.get(A),X=b.state.lights,ye=b.state.shadowsArray,Le=X.state.version,_e=ne.getParameters(A,X.state,ye,z,Z,b.state.lightProbeGridArray),Te=ne.getProgramCacheKey(_e),Fe=W.programs;W.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?z.environment:null,W.fog=z.fog;let st=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;W.envMap=T.get(A.envMap||W.environment,st),W.envMapRotation=W.environment!==null&&A.envMap===null?z.environmentRotation:A.envMapRotation,Fe===void 0&&(A.addEventListener("dispose",Rt),Fe=new Map,W.programs=Fe,W.programVariants=new Map);let pt=Fe.get(Te);if(pt!==void 0){if(W.currentProgram===pt&&W.lightsStateVersion===Le)return ad(A,_e),pt}else _e.uniforms=ne.getUniforms(A),G!==null&&A.isNodeMaterial&&G.build(A,Z,_e),A.onBeforeCompile(_e,I),pt=ne.acquireProgram(_e,Te),Fe.set(Te,pt),W.uniforms=_e.uniforms;let De=W.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(De.clippingPlanes=Q.uniform),ad(A,_e),W.needsLights=Km(A),W.lightsStateVersion=Le,W.needsLights&&(De.ambientLightColor.value=X.state.ambient,De.lightProbe.value=X.state.probe,De.sunLights.value=X.state.sun,De.sunLightShadows.value=X.state.sunShadow,De.directionalLights.value=X.state.directional,De.directionalLightShadows.value=X.state.directionalShadow,De.spotLights.value=X.state.spot,De.spotLightShadows.value=X.state.spotShadow,De.rectAreaLights.value=X.state.rectArea,De.ltc_1.value=X.state.rectAreaLTC1,De.ltc_2.value=X.state.rectAreaLTC2,De.pointLights.value=X.state.point,De.pointLightShadows.value=X.state.pointShadow,De.hemisphereLights.value=X.state.hemi,De.sunShadowMatrix.value=X.state.sunShadowMatrix,De.sunShadowCascade.value=X.state.sunShadowCascade,De.directionalShadowMatrix.value=X.state.directionalShadowMatrix,De.spotLightMatrix.value=X.state.spotLightMatrix,De.spotLightMap.value=X.state.spotLightMap,De.pointShadowMatrix.value=X.state.pointShadowMatrix),W.numLightProbeGrids=sd(b.state.lightProbeGridArray),W.currentProgram=pt,W.uniformsList=null,pt}function qm(A,z,Z,W,X){let ye=ke.get(A),Le=ye.currentProgram.id+","+W+","+X,_e=ye.programVariants.get(Le);return _e===void 0?(_e=oa(A,z,Z),ye.programVariants.set(Le,_e)):(ye.currentProgram=_e,ye.uniformsList=null,ye.outputColorSpace=W,ye.toneMapping=X),_e}function rd(A){if(A.uniformsList===null){let z=A.currentProgram.getUniforms();A.uniformsList=Kr.seqWithValue(z.seq,A.uniforms)}return A.uniformsList}function ad(A,z){let Z=ke.get(A);Z.outputColorSpace=z.outputColorSpace,Z.batching=z.batching,Z.batchingColor=z.batchingColor,Z.instancing=z.instancing,Z.instancingColor=z.instancingColor,Z.instancingMorph=z.instancingMorph,Z.skinning=z.skinning,Z.morphTargets=z.morphTargets,Z.morphNormals=z.morphNormals,Z.morphColors=z.morphColors,Z.morphTargetsCount=z.morphTargetsCount,Z.numClippingPlanes=z.numClippingPlanes,Z.numIntersection=z.numClipIntersection,Z.vertexAlphas=z.vertexAlphas,Z.vertexTangents=z.vertexTangents,Z.toneMapping=z.toneMapping}function Ym(A,z,Z,W,X){z.isScene!==!0&&(z=nt),Ye.resetTextureUnits();let ye=z.fog,Le=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?z.environment:null,_e=K===null?I.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:ht.workingColorSpace,Te=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Fe=T.get(W.envMap||Le,Te),st=W.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pt=!!Z.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),De=!!Z.morphAttributes.position,mt=!!Z.morphAttributes.normal,Yt=!!Z.morphAttributes.color,Ft=yi;W.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Ft=I.toneMapping);let Nt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,mn=Nt!==void 0?Nt.length:0,Ue=ke.get(W),wn=b.state.lights;if(se===!0&&(we===!0||A!==R)){let Gt=A===R&&W.id===B;Q.setState(W,A,Gt)}let St=!1,Es=!1;W.version===Ue.__version?Ue.needsLights&&Ue.lightsStateVersion!==wn.state.version||X.isBatchedMesh&&Ue.batching===!1||!X.isBatchedMesh&&Ue.batching===!0||X.isBatchedMesh&&Ue.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Ue.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Ue.instancing===!1||!X.isInstancedMesh&&Ue.instancing===!0||X.isSkinnedMesh&&Ue.skinning===!1||!X.isSkinnedMesh&&Ue.skinning===!0||X.isInstancedMesh&&Ue.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ue.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ue.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ue.instancingMorph===!1&&X.morphTexture!==null||Ue.envMap!==Fe||W.fog===!0&&Ue.fog!==ye||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==Q.numPlanes||Ue.numIntersection!==Q.numIntersection)||Ue.vertexAlphas!==st||Ue.vertexTangents!==pt||Ue.morphTargets!==De||Ue.morphNormals!==mt||Ue.morphColors!==Yt||Ue.morphTargetsCount!==mn||Ue.numLightProbeGrids!==sd(b.state.lightProbeGridArray)?St=!0:(Ue.outputColorSpace!==_e||Ue.toneMapping!==Ft)&&(Es=!0):(St=!0,Ue.__version=W.version);let gn=Ue.currentProgram;(St===!0||Es===!0)&&(gn=Es===!0?qm(W,z,X,_e,Ft):oa(W,z,X),G&&W.isNodeMaterial&&G.onUpdateProgram(W,gn,Ue));let Io=!1,ji=!1,ws=!1,yt=gn.getUniforms(),fn=Ue.uniforms;if(de.useProgram(gn.program)&&(Io=!0,ji=!0,ws=!0),W.id!==B&&(B=W.id,ji=!0),Io||R!==A){de.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),yt.setValue(k,"projectionMatrix",A.projectionMatrix),yt.setValue(k,"viewMatrix",A.matrixWorldInverse);let on=yt.map.cameraPosition;on!==void 0&&on.setValue(k,Xe.setFromMatrixPosition(A.matrixWorld)),Et.logarithmicDepthBuffer&&yt.setValue(k,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&yt.setValue(k,"isOrthographic",A.isOrthographicCamera===!0),R!==A&&(R=A,ji=!0,ws=!0)}if(Ue.needsLights&&(wn.state.sunShadowMap.length>0&&yt.setValue(k,"sunShadowMap",wn.state.sunShadowMap,Ye),wn.state.directionalShadowMap.length>0&&yt.setValue(k,"directionalShadowMap",wn.state.directionalShadowMap,Ye),wn.state.spotShadowMap.length>0&&yt.setValue(k,"spotShadowMap",wn.state.spotShadowMap,Ye),wn.state.pointShadowMap.length>0&&yt.setValue(k,"pointShadowMap",wn.state.pointShadowMap,Ye)),X.isSkinnedMesh){yt.setOptional(k,X,"bindMatrix"),yt.setOptional(k,X,"bindMatrixInverse");let Gt=X.skeleton;Gt&&(Gt.boneTexture===null&&Gt.computeBoneTexture(),yt.setValue(k,"boneTexture",Gt.boneTexture,Ye))}X.isBatchedMesh&&(yt.setOptional(k,X,"batchingTexture"),yt.setValue(k,"batchingTexture",X._matricesTexture,Ye),yt.setOptional(k,X,"batchingIdTexture"),yt.setValue(k,"batchingIdTexture",X._indirectTexture,Ye),yt.setOptional(k,X,"batchingColorTexture"),X._colorsTexture!==null&&yt.setValue(k,"batchingColorTexture",X._colorsTexture,Ye));let Qn=Z.morphAttributes;if((Qn.position!==void 0||Qn.normal!==void 0||Qn.color!==void 0)&&ee.update(X,Z,gn),(ji||Ue.receiveShadow!==X.receiveShadow)&&(Ue.receiveShadow=X.receiveShadow,yt.setValue(k,"receiveShadow",X.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&z.environment!==null&&(fn.envMapIntensity.value=z.environmentIntensity),fn.dfgLUT!==void 0&&(fn.dfgLUT.value=vM()),ji){if(yt.setValue(k,"toneMappingExposure",I.toneMappingExposure),Ue.needsLights&&Zm(fn,ws),ye&&W.fog===!0&&pe.refreshFogUniforms(fn,ye),pe.refreshMaterialUniforms(fn,W,ce,Be,b.state.transmissionRenderTarget[A.id]),Ue.needsLights&&Ue.numLightProbeGrids>0){let Gt=M,on=0;for(let Ri of b.state.lightProbeGridArray)Ri.texture!==null&&(Gt.textures[on]=Ri.texture,Gt.min[on]=Ri.boundingBox.min,Gt.max[on]=Ri.boundingBox.max,Gt.resolution[on]=Ri.resolution,on++);for(let Ri in Gt)Gt[Ri].length=on;fn.probesSH.value=Gt.textures,fn.probesMin.value=Gt.min,fn.probesMax.value=Gt.max,fn.probesResolution.value=Gt.resolution}Kr.upload(k,rd(Ue),fn,Ye)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Kr.upload(k,rd(Ue),fn,Ye),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&yt.setValue(k,"center",X.center),yt.setValue(k,"modelViewMatrix",X.modelViewMatrix),yt.setValue(k,"normalMatrix",X.normalMatrix),yt.setValue(k,"modelMatrix",X.matrixWorld),W.uniformsGroups!==void 0){let Gt=W.uniformsGroups;for(let on=0,Ri=Gt.length;on<Ri;on++){let ld=Gt[on];ze.update(ld,gn),ze.bind(ld,gn)}}return gn}function Zm(A,z){A.ambientLightColor.needsUpdate=z,A.lightProbe.needsUpdate=z,A.sunLights.needsUpdate=z,A.sunLightShadows.needsUpdate=z,A.directionalLights.needsUpdate=z,A.directionalLightShadows.needsUpdate=z,A.pointLights.needsUpdate=z,A.pointLightShadows.needsUpdate=z,A.spotLights.needsUpdate=z,A.spotLightShadows.needsUpdate=z,A.rectAreaLights.needsUpdate=z,A.hemisphereLights.needsUpdate=z}function Km(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(A,z,Z){let W=ke.get(A);W.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),ke.get(A.texture).__webglTexture=z,ke.get(A.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:Z,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,z){let Z=ke.get(A);Z.__webglFramebuffer=z,Z.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(A,z=0,Z=0){K=A,H=z,L=Z;let W=null,X=!1,ye=!1;if(A){let _e=ke.get(A);if(_e.__useDefaultFramebuffer!==void 0){de.bindFramebuffer(k.FRAMEBUFFER,_e.__webglFramebuffer),C.copy(A.viewport),$.copy(A.scissor),Me=A.scissorTest,de.viewport(C),de.scissor($),de.setScissorTest(Me),B=-1;return}else if(_e.__webglFramebuffer===void 0)Ye.setupRenderTarget(A);else if(_e.__hasExternalTextures)Ye.rebindTextures(A,ke.get(A.texture).__webglTexture,ke.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let st=A.depthTexture;if(_e.__boundDepthTexture!==st){if(st!==null&&ke.has(st)&&(A.width!==st.image.width||A.height!==st.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ye.setupDepthRenderbuffer(A)}}let Te=A.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ye=!0);let Fe=ke.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Fe[z])?W=Fe[z][Z]:W=Fe[z],X=!0):A.samples>0&&Ye.useMultisampledRTT(A)===!1?W=ke.get(A).__webglMultisampledFramebuffer:Array.isArray(Fe)?W=Fe[Z]:W=Fe,C.copy(A.viewport),$.copy(A.scissor),Me=A.scissorTest}else C.copy(Pe).multiplyScalar(ce).floor(),$.copy(je).multiplyScalar(ce).floor(),Me=et;if(Z!==0&&(W=Y),de.bindFramebuffer(k.FRAMEBUFFER,W)&&de.drawBuffers(A,W),de.viewport(C),de.scissor($),de.setScissorTest(Me),X){let _e=ke.get(A.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+z,_e.__webglTexture,Z)}else if(ye){let _e=z;for(let Te=0;Te<A.textures.length;Te++){let Fe=ke.get(A.textures[Te]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Te,Fe.__webglTexture,Z,_e)}}else if(A!==null&&Z!==0){let _e=ke.get(A.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,_e.__webglTexture,Z)}B=-1};function od(A){let z=ke.get(A);return(z.__readFormat!==A.format||z.__readType!==A.type)&&(z.__readFormat=A.format,z.__readType=A.type,z.__formatReadable=Et.textureFormatReadable(A.format),z.__typeReadable=Et.textureTypeReadable(A.type)),z}this.readRenderTargetPixels=function(A,z,Z,W,X,ye,Le,_e=0){if(!(A&&A.isWebGLRenderTarget)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=ke.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(Te=Te[Le],Array.isArray(Te)&&(Te=Te[0])),Te){de.bindFramebuffer(k.FRAMEBUFFER,Te);try{let Fe=A.textures[_e],st=Fe.format,pt=Fe.type;A.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+_e);let De=od(Fe);if(De.__formatReadable===!1){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(De.__typeReadable===!1){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=A.width-W&&Z>=0&&Z<=A.height-X&&k.readPixels(z,Z,W,X,he.convert(st),he.convert(pt),ye)}finally{let Fe=K!==null?ke.get(K).__webglFramebuffer:null;de.bindFramebuffer(k.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(A,z,Z,W,X,ye,Le,_e=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=ke.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(Te=Te[Le],Array.isArray(Te)&&(Te=Te[0])),Te)if(z>=0&&z<=A.width-W&&Z>=0&&Z<=A.height-X){de.bindFramebuffer(k.FRAMEBUFFER,Te);let Fe=A.textures[_e],st=Fe.format,pt=Fe.type;A.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+_e);let De=od(Fe);if(De.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(De.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let mt=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,mt),k.bufferData(k.PIXEL_PACK_BUFFER,ye.byteLength,k.STREAM_READ),k.readPixels(z,Z,W,X,he.convert(st),he.convert(pt),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);let Yt=K!==null?ke.get(K).__webglFramebuffer:null;de.bindFramebuffer(k.FRAMEBUFFER,Yt);let Ft=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Yp(k,Ft,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,mt),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,ye),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(mt),k.deleteSync(Ft),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,z=null,Z=0){let W=Math.pow(2,-Z),X=Math.floor(A.image.width*W),ye=Math.floor(A.image.height*W),Le=z!==null?z.x:0,_e=z!==null?z.y:0;Ye.setTexture2D(A,0),k.copyTexSubImage2D(k.TEXTURE_2D,Z,0,0,Le,_e,X,ye),de.unbindTexture()},this.copyTextureToTexture=function(A,z,Z=null,W=null,X=0,ye=0){let Le,_e,Te,Fe,st,pt,De,mt,Yt,Ft=A.isCompressedTexture?A.mipmaps[ye]:A.image;if(Z!==null)Le=Z.max.x-Z.min.x,_e=Z.max.y-Z.min.y,Te=Z.isBox3?Z.max.z-Z.min.z:1,Fe=Z.min.x,st=Z.min.y,pt=Z.isBox3?Z.min.z:0;else{let yt=Math.pow(2,-X);Le=Math.floor(Ft.width*yt),_e=Math.floor(Ft.height*yt),A.isDataArrayTexture?Te=Ft.depth:A.isData3DTexture?Te=Math.floor(Ft.depth*yt):Te=1,Fe=0,st=0,pt=0}W!==null?(De=W.x,mt=W.y,Yt=W.z):(De=0,mt=0,Yt=0);let Nt=he.convert(z.format),mn=he.convert(z.type),Ue;z.isData3DTexture?(Ye.setTexture3D(z,0),Ue=k.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Ye.setTexture2DArray(z,0),Ue=k.TEXTURE_2D_ARRAY):(Ye.setTexture2D(z,0),Ue=k.TEXTURE_2D),de.activeTexture(k.TEXTURE0),de.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,z.flipY),de.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),de.pixelStorei(k.UNPACK_ALIGNMENT,z.unpackAlignment);let wn=de.getParameter(k.UNPACK_ROW_LENGTH),St=de.getParameter(k.UNPACK_IMAGE_HEIGHT),Es=de.getParameter(k.UNPACK_SKIP_PIXELS),gn=de.getParameter(k.UNPACK_SKIP_ROWS),Io=de.getParameter(k.UNPACK_SKIP_IMAGES);de.pixelStorei(k.UNPACK_ROW_LENGTH,Ft.width),de.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Ft.height),de.pixelStorei(k.UNPACK_SKIP_PIXELS,Fe),de.pixelStorei(k.UNPACK_SKIP_ROWS,st),de.pixelStorei(k.UNPACK_SKIP_IMAGES,pt);let ji=A.isDataArrayTexture||A.isData3DTexture,ws=z.isDataArrayTexture||z.isData3DTexture;if(A.isDepthTexture){let yt=ke.get(A),fn=ke.get(z),Qn=ke.get(yt.__renderTarget),Gt=ke.get(fn.__renderTarget);de.bindFramebuffer(k.READ_FRAMEBUFFER,Qn.__webglFramebuffer),de.bindFramebuffer(k.DRAW_FRAMEBUFFER,Gt.__webglFramebuffer);for(let on=0;on<Te;on++)ji&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ke.get(A).__webglTexture,X,pt+on),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ke.get(z).__webglTexture,ye,Yt+on)),k.blitFramebuffer(Fe,st,Fe+Le,st+_e,De,mt,De+Le,mt+_e,k.DEPTH_BUFFER_BIT,k.NEAREST);de.bindFramebuffer(k.READ_FRAMEBUFFER,null),de.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(X!==0||A.isRenderTargetTexture||ke.has(A)){let yt=ke.get(A),fn=ke.get(z);de.bindFramebuffer(k.READ_FRAMEBUFFER,P),de.bindFramebuffer(k.DRAW_FRAMEBUFFER,U);for(let Qn=0;Qn<Te;Qn++)ji?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,yt.__webglTexture,X,pt+Qn):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,yt.__webglTexture,X),ws?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,fn.__webglTexture,ye,Yt+Qn):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,fn.__webglTexture,ye),X!==0?k.blitFramebuffer(Fe,st,Fe+Le,st+_e,De,mt,De+Le,mt+_e,k.COLOR_BUFFER_BIT,k.NEAREST):ws?k.copyTexSubImage3D(Ue,ye,De,mt,Yt+Qn,Fe,st,Le,_e):k.copyTexSubImage2D(Ue,ye,De,mt,Fe,st,Le,_e);de.bindFramebuffer(k.READ_FRAMEBUFFER,null),de.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else ws?A.isDataTexture||A.isData3DTexture?k.texSubImage3D(Ue,ye,De,mt,Yt,Le,_e,Te,Nt,mn,Ft.data):z.isCompressedArrayTexture?k.compressedTexSubImage3D(Ue,ye,De,mt,Yt,Le,_e,Te,Nt,Ft.data):k.texSubImage3D(Ue,ye,De,mt,Yt,Le,_e,Te,Nt,mn,Ft):A.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,ye,De,mt,Le,_e,Nt,mn,Ft.data):A.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,ye,De,mt,Ft.width,Ft.height,Nt,Ft.data):k.texSubImage2D(k.TEXTURE_2D,ye,De,mt,Le,_e,Nt,mn,Ft);de.pixelStorei(k.UNPACK_ROW_LENGTH,wn),de.pixelStorei(k.UNPACK_IMAGE_HEIGHT,St),de.pixelStorei(k.UNPACK_SKIP_PIXELS,Es),de.pixelStorei(k.UNPACK_SKIP_ROWS,gn),de.pixelStorei(k.UNPACK_SKIP_IMAGES,Io),ye===0&&z.generateMipmaps===!0&&z.mipmapsAutoUpdate===!0&&k.generateMipmap(Ue),de.unbindTexture()},this.initRenderTarget=function(A){ke.get(A).__webglFramebuffer===void 0&&Ye.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Ye.setTextureCube(A,0):A.isData3DTexture?Ye.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Ye.setTexture2DArray(A,0):Ye.setTexture2D(A,0),de.unbindTexture()},this.resetState=function(){H=0,L=0,K=null,de.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=ht._getUnpackColorSpace()}};function yo(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new gt;c.morphTargetsRelative=o;let l=0;for(let h=0;h<i.length;++h){let f=i[h],u=0,d=0;if(t!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in f.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(f.attributes[p]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in f.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(f.morphAttributes[p].length!==i[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;a[p]===void 0&&(a[p]=[]),a[p].push(f.morphAttributes[p]),d++}if(d!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(e){let p;if(t)p=f.index.count;else if(f.attributes.position!==void 0)p=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,h),l+=p}}if(t){let h=0,f=[];for(let u=0;u<i.length;++u){let d=i[u].index;for(let p=0;p<d.count;++p)f.push(d.getX(p)+h);h+=i[u].attributes.position.count}c.setIndex(f)}for(let h in r){let f=U0(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,f)}for(let h in a){let f=a[h][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<f;++u){let d=[];for(let x=0;x<a[h].length;++x)d.push(a[h][x][u]);let p=U0(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}}return c}function U0(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new Ot(a,t,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let f=c/t;for(let u=0,d=h.count;u<d;u++)for(let p=0;p<t;p++){let x=h.getComponent(u,p);o.setComponent(u+f,p,x)}}else a.set(h.array,c);c+=h.count*t}return s!==void 0&&(o.gpuType=s),o}function Ju(i,e){if(e===yu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Yr||e===mo){let t=i.getIndex();if(t===null){let r=[],a=i.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Yr)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var yM=Math.PI*2,bn=[0,0,0],ms={blue:1085152,blueShade:479381,ice:7985151,navy:1453392,skin:15840638,skinShade:13208928,khaki:13675111,tan:11960903,leather:5518632,dark:2434352,gun:2504008,steel:8492968,red:15150389,wine:9377830,orange:16756781,gold:15775821};function MM(i,e=16,t=1,n=null){let s=[],r=[],a=n?e+1:e,o=n?n[0]:0,c=n?n[1]-n[0]:yM;for(let[h,f,u,d=0,p=0]of i)for(let x=0;x<a;x++){let m=o+c*x/e,g=Math.sin(m),_=Math.cos(m);s.push(d+f*Math.sign(g)*Math.abs(g)**t,h,p+u*Math.sign(_)*Math.abs(_)**t)}for(let h=0;h<i.length-1;h++)for(let f=0;f<e;f++){let u=n?f+1:(f+1)%a,d=h*a+f,p=h*a+u;r.push(d,p,d+a,p,p+a,d+a)}if(!n)for(let h of[!1,!0]){let f=h?i.length-1:0,[u,,,d=0,p=0]=i[f],x=s.length/3;s.push(d,u,p);let m=f*a;for(let g=0;g<e;g++){let _=m+g,y=m+(g+1)%e;h?r.push(x,_,y):r.push(x,y,_)}}let l=new gt;return l.setAttribute("position",new He(s,3)),l.setIndex(r),l.computeVertexNormals(),l}function bM(i=12,e=8){return new si(1,i,e)}function Jn(i,e,t,n=t,s=8){let r=new N(...i),a=new N(...e),o=a.clone().sub(r),c=new nn(n,t,o.length(),s);c.applyQuaternion(new en().setFromUnitVectors(new N(0,1,0),o.normalize()));let l=r.add(a).multiplyScalar(.5);return c.translate(l.x,l.y,l.z)}function Mo(i,e,t=6){let n=new Bi(i.map(s=>new N(...s)));return new Vs(n,(i.length-1)*3,e,t,!1)}function SM(){let i=new Bt({vertexColors:!0,shininess:18,specular:3156007});return i.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 fabricPoint;`).replace("#include <begin_vertex>",`#include <begin_vertex>
fabricPoint=position;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 fabricPoint;`).replace("#include <color_fragment>",`#include <color_fragment>
        vec2 stitch=vec2(fabricPoint.x+.42*fabricPoint.z,fabricPoint.y)*175.;
        vec2 weight=1.-smoothstep(vec2(.75),vec2(2.7),fwidth(stitch));
        float thread=dot(sin(stitch*3.14159),weight)*.024;
        diffuseColor.rgb*=1.+thread;`)},{cloth:i,lacquer:new Bt({vertexColors:!0,shininess:58,specular:7175302}),metal:new Bt({vertexColors:!0,shininess:78,specular:10201786})}}var Zi=class{constructor(){this.byFinish=new Map}add(e,t,n=bn,s=[1,1,1],r=bn,a="cloth"){let o=new We().compose(new N(...n),new en().setFromEuler(new $t(...r)),new N(...s));e.applyMatrix4(o),e.deleteAttribute("uv"),e.clearGroups();let c=e.attributes.position.count;e.index===null&&e.setIndex(Array.from({length:c},(f,u)=>u));let l=new Ae(t),h=new Float32Array(c*3);for(let f=0;f<c;f++){let u=f*3;h[u]=l.r,h[u+1]=l.g,h[u+2]=l.b}e.setAttribute("color",new Ot(h,3)),this.limb!==void 0&&e.setAttribute("limb",new He(new Float32Array(c).fill(this.limb),1)),this.byFinish.has(a)||this.byFinish.set(a,[]),this.byFinish.get(a).push(e)}shape(e,t,n={}){let{sides:s=16,power:r=1,arc:a=null,at:o,scale:c,rotate:l,finish:h}=n;this.add(MM(e,s,r,a),t,o,c,l,h)}ell(e,t,n,s=bn,r="cloth",a=14,o=8){this.add(bM(a,o),e,t,n,s,r)}box(e,t,n,s=bn,r="cloth"){this.add(new Nn(1,1,1),e,t,n,s,r)}joinGeometry(){let e=yo([...this.byFinish.values()].flat(),!1);return e.computeBoundingSphere(),e.computeBoundingBox(),e}attach(e,t){for(let[n,s]of this.byFinish){let r=new Qe(yo(s,!1),t[n]);r.castShadow=!0,e.add(r)}}};function gs(i,e=0,t=0,n=0){let s=new Ct;return s.position.set(e,t,n),i.add(s),s}function O0(i,e="near"){let t=i==="red",n=e==="far",s=new Zi,r=t?15873338:1351656,a=t?11542827:1399980,o=t?10829881:12949854,c=n?6:10,l=n?5:8;for(let f of[-1,1]){s.limb=f;let u=f*.081;s.shape([[.01,.058,.105,u,-.031],[.05,.068,.11,u,-.032],[.12,.05,.067,u]],3484976,{sides:n?4:6,power:.72}),s.shape([[.075,.055,.058,u],[.22,.068,.074,u*.91],[.3,.073,.078,u*.83]],t?6701875:2906496,{sides:n?4:6})}s.limb=0,s.shape([[.235,.117,.081],[.3,.151,.114],[.42,.153,.101],[.485,.118,.084]],o,{sides:n?5:8,power:.89}),n||(s.shape([[.274,.137,.11],[.307,.151,.117]],6899252,{sides:8}),s.box(10712389,[0,.365,.097],[.093,.118,.045],[.03,0,.08]));for(let f of[-1,1]){s.limb=f*2;let u=f*.166;s.shape([[.26,.037,.044,u*1.12,-.031],[.298,.055,.06,u*1.07,-.03],[.386,.052,.057,u,.007],[.444,.05,.058,u*.91]],15772528,{sides:n?4:6}),n||s.ell(o,[u*.88,.427,.008],[.083,.078,.092],bn,"cloth",6,3)}if(s.limb=0,s.shape([[.43,.072,.073,0,-.012],[.462,.127,.1,0,-.016],[.548,.161,.14],[.635,.162,.149]],16761484,{sides:l,power:.82}),n||(s.ell(14129257,[-.151,.546,.005],[.033,.046,.041],bn,"cloth",5,3),s.ell(14129257,[.151,.546,.005],[.033,.046,.041],bn,"cloth",5,3)),s.shape([[.548,.177,.162,0,.009],[.585,.221,.198],[.613,.215,.195]],a,{sides:c}),s.shape([[.595,.224,.2],[.644,.229,.211],[.744,.204,.19],[.818,.132,.124],[.847,.054,.052]],r,{sides:c}),!n){if(s.shape([[.589,.221,.201],[.605,.226,.205]],t?16145742:7194613,{sides:10}),s.limb=0,t){for(let f of[.66,.698])s.box(16768401,[0,f,-.203],[.09,.019,.017],[-.23,0,0]);s.add(Jn([-.093,.449,-.096],[.107,.291,-.111],.017,.018,5),5847082),s.box(14923627,[.027,.356,-.127],[.041,.031,.014],[0,0,-.57]);for(let f of[-1,1])s.box(7422515,[f*.093,.302,-.098],[.067,.065,.04],[0,-f*.23,0]),s.box(12621402,[f*.093,.318,-.121],[.055,.018,.012]),s.box(14198113,[f*.11,.448,-.031],[.054,.019,.097],[0,0,-f*.28])}else{s.box(3690845,[0,.351,.116],[.194,.177,.086]),s.box(5010046,[0,.356,.163],[.159,.118,.02]),s.add(Jn([-.109,.447,.13],[.109,.447,.13],.039,.039,8),14334075);for(let f of[-1,1])s.box(7031092,[f*.053,.372,.179],[.023,.171,.018]),s.box(14727549,[f*.053,.335,.189],[.036,.025,.014]);s.add(Mo([[0,.65,.205],[0,.739,.189],[0,.808,.127],[0,.845,.05],[0,.852,-.027]],.014,6),9558778)}t||(s.limb=2,s.add(Jn([.163,.264,.032],[.173,.525,-.19],.026,.026,5),ms.gun),s.add(Jn([.173,.51,-.18],[.173,.656,-.268],.013,.013,5),2966610))}if(t){s.ell(a,[0,.583,-.12],[.18,.019,.133],[-.14,0,0],"cloth",8,3),s.ell(15706736,[0,.514,-.139],[.042,.042,.061],bn,"cloth",5,3),n&&s.box(16762755,[0,.68,-.196],[.09,.027,.013],[-.28,0,0]);for(let f of[-1,1])s.ell(4336940,[f*.061,.536,-.14],[.026,.022,.015],[0,-f*.28,-f*.12],"cloth",5,3)}let h=s.joinGeometry();return h.scale(1.055,1.016,1),t&&h.rotateY(Math.PI),h.computeBoundingBox(),h}function B0(i){let e=new Zi;if(i==="guard")e.box(5399670,[.12,.32,.155],[.25,.34,.065],[-.12,0,-.045]),e.box(11978175,[.12,.36,.194],[.2,.038,.014]);else if(i==="gunner")e.add(Jn([.14,.33,.07],[.13,.37,.39],.04,.03,6),3490385),e.add(Jn([.13,.37,.38],[.13,.38,.47],.038,.038,6),8159365);else if(i==="standard")e.add(Jn([-.18,.19,-.05],[-.18,1.09,-.05],.025,.02,6),7626823),e.box(15382366,[-.18,1.08,-.04],[.078,.06,.078]),e.box(10890041,[-.01,.93,-.05],[.33,.22,.043],[-.08,0,-.09]),e.box(16767874,[-.035,.92,-.02],[.18,.043,.02]);else if(i==="courier")e.box(13744003,[.18,.34,.1],[.26,.22,.14],[0,0,-.16]),e.box(16773587,[.18,.34,.177],[.17,.145,.018]),e.box(12011077,[.18,.34,.196],[.035,.12,.01]),e.box(12011077,[.18,.34,.196],[.12,.035,.01]);else if(i==="vault")e.add(Jn([.22,.07,.46],[.16,1.19,-.53],.027,.017,8),16764021),e.add(Jn([.2,.32,.24],[.195,.47,.11],.033,.033,8),4411998);else{e.box(6636858,[0,.38,.12],[.23,.15,.082]);for(let t of[-.068,0,.068])e.add(Jn([t,.32,.163],[t,.45,.17],.029,.029,6),14633778)}return e.joinGeometry()}function F0(i,e,t){let n=gs(i,e*.117,.607,0),s=new Zi;return s.shape([[-.385,.063,.064,e*.013,.016],[-.29,.086,.082,e*.012,.012],[-.165,.103,.103,e*.007,-.005],[-.032,.111,.114],[.036,.079,.086]],3629962,{sides:12}),s.shape([[-.59,.078,.142,e*.013,-.045],[-.553,.091,.153,e*.012,-.044],[-.493,.092,.141,e*.012,-.036],[-.448,.079,.082,e*.012,.012],[-.299,.08,.077,e*.012,.018]],5586993,{sides:12,power:.74}),s.shape([[-.606,.081,.143,e*.013,-.045],[-.586,.092,.151,e*.013,-.046],[-.565,.092,.151,e*.013,-.045]],3485490,{sides:12,power:.7}),s.shape([[-.327,.081,.079,e*.012,.015],[-.291,.086,.084,e*.012,.014]],9134660,{sides:12}),s.attach(n,t),n}function z0(){let i=new Ct,e=SM(),t=gs(i),n=F0(t,-1,e),s=F0(t,1,e),r=gs(t,0,.62),a=new Zi;a.shape([[-.075,.183,.122],[.005,.217,.15],[.102,.221,.156],[.264,.274,.19],[.367,.285,.177],[.416,.191,.131]],ms.khaki,{power:.8}),a.shape([[-.046,.216,.146],[-.008,.226,.155],[.045,.227,.158]],ms.leather,{sides:16,power:.8}),a.shape([[.358,.185,.128],[.392,.187,.136],[.431,.165,.12]],15977614,{sides:14}),a.shape([[.375,.102,.106],[.502,.106,.099]],ms.skinShade);let o=[];for(let x of[-1,1]){let m=x*.158;a.add(Mo([[m*.8,.005,.155],[m*.85,.135,.179],[m,.29,.168],[m,.37,.126],[m*.85,.405,.014],[m*.81,.36,-.111]],.027),7950390),a.box(12164198,[m*.89,.22,.192],[.064,.035,.015],[0,0,x*.065],"metal");let g=gs(r,m*1.47,.34,0),_=gs(g,-m*1.47,-.34,0);o.push(g);let y=new Zi;y.shape([[.144,.078,.084,m*1.62,.042],[.207,.102,.109,m*1.66,.022],[.307,.107,.112,m*1.6],[.342,.07,.073,m*1.47]],13210966,{sides:12}),y.add(Jn([m*1.74,.18,.038],[m*1.88,.074,-.092],.066,.059,10),ms.skin),y.ell(9069123,[m*1.88,.078,-.105],[.07,.068,.076],[.22,0,0]),y.attach(_,e)}for(let x of[-1,1])a.box(13015648,[x*.124,.22,-.157],[.126,.101,.03],[.08,x*.16,0]),a.box(15122300,[x*.124,.249,-.174],[.13,.037,.016],[.1,x*.16,0]);a.box(13280874,[0,-.011,-.153],[.1,.061,.021],bn,"metal"),a.box(9987129,[0,.077,.144],[.17,.112,.074],[.08,0,0]),a.box(12289103,[0,.101,.184],[.172,.062,.02],[.12,0,0]),a.add(Mo([[-.165,.034,.158],[-.002,.169,.207],[.153,.292,.17]],.033),9463616),a.attach(r,e);let c=gs(r,-.027,.461,-.015),l=new Zi;l.shape([[0,.093,.078],[.024,.142,.126,0,-.012],[.078,.189,.162,0,-.016],[.204,.211,.181,0,-.004],[.278,.203,.176],[.327,.142,.137]],ms.skin,{sides:18,power:.83});for(let x of[-1,1])l.ell(14788213,[x*.201,.145,.001],[.037,.072,.053]),l.add(Mo([[x*.199,.245,.062],[x*.192,.112,.045],[x*.148,.014,-.001],[x*.068,-.005,-.052]],.019),7885632);l.shape([[.192,.18,.168,0,.009],[.219,.223,.202],[.264,.224,.202]],7229755,{sides:20,arc:[-.69*Math.PI,.69*Math.PI]}),l.ell(13996641,[0,.132,-.167],[.052,.049,.05]);for(let x of[-1,1])l.ell(5519405,[x*.08,.168,-.155],[.042,.013,.016],[0,-x*.31,-x*.09]),l.ell(3882042,[x*.076,.15,-.164],[.018,.021,.014],[0,-x*.28,0],"lacquer",9,5);l.add(Mo([[-.054,.079,-.157],[0,.07,-.169],[.053,.078,-.155]],.009),11892307),l.shape([[.207,.224,.212,0,.015],[.243,.273,.242,0,.011],[.279,.285,.253],[.302,.279,.248]],ms.blueShade,{sides:24,finish:"lacquer"}),l.shape([[.255,.275,.251],[.272,.286,.258],[.288,.282,.253]],6867711,{sides:24,finish:"lacquer"}),l.shape([[.281,.278,.25],[.331,.288,.257],[.413,.275,.249],[.498,.23,.222],[.574,.144,.155],[.609,.055,.068],[.614,.014,.022]],ms.blue,{sides:28,finish:"lacquer"}),l.shape([[.296,.281,.252],[.312,.289,.259],[.325,.292,.261]],12114656,{sides:30,finish:"metal"});for(let x of[-1,1])l.ell(14793848,[x*.255,.325,.114],[.013,.016,.014],bn,"metal",8,5);l.attach(c,e);let h=gs(r,.295,.691,-.03),f=new Zi;function u(x,m,g,_,y,M="metal",w=18){f.add(Jn([0,0,_],[0,0,y],m,g,w),x,bn,[1,1,1],bn,M)}u(2505549,.106,.11,-.48,.367),u(3558238,.13,.12,-.5,-.375),u(6928350,.142,.142,-.495,-.471),u(2110276,.142,.142,-.549,-.498),u(7442078,.147,.147,-.558,-.541),u(1252139,.105,.105,-.561,-.56),u(2635849,.144,.134,-.275,-.12),u(5540523,.141,.135,-.254,-.205),u(3305115,.125,.129,-.044,.161);for(let x of[-.292,-.119,.148,.203,.249,.294])u(x<.15?8559533:6058374,.139,.139,x,x+.021);u(2504006,.146,.137,.178,.346),u(10005948,.154,.153,.322,.36),u(2503748,.127,.123,.359,.373),u(1319473,.087,.086,.374,.375),f.box(3756390,[0,.095,-.1],[.093,.09,.202],bn,"metal"),f.box(7785452,[0,.147,-.12],[.103,.023,.105],bn,"metal"),f.box(3229274,[.098,.066,.061],[.052,.047,.189],bn,"metal"),f.ell(8701671,[.123,.065,.02],[.012,.022,.036],bn,"lacquer"),f.attach(h,e);let d=gs(h,0,0,-.57);function p({time:x=0,run:m=0,recoil:g=0,merge:_=0,lean:y=0}={}){let M=x*10.9;n.rotation.x=Math.sin(M)*.53*m,s.rotation.x=-Math.sin(M)*.53*m;let w=Math.sin(M)*m;o[0].rotation.x=-w*.46,o[1].rotation.x=w*.15+g*.12,r.rotation.y=w*.055,t.position.y=(1-Math.cos(M*2))*.019*m,r.rotation.z=-y*.13+Math.sin(M)*.021*m,r.rotation.x=-.058*m+g*.085,c.rotation.z=y*.026,h.position.z=-.03+g*.155,h.rotation.x=g*.14,e.cloth.emissive.setRGB(_*.43,_*.21,_*.05),e.lacquer.emissive.setRGB(_*.37,_*.31,_*.11),e.metal.emissive.setRGB(_*.29,_*.22,_*.07)}return{root:i,animate:p,muzzle:d}}var Hc=.18700000000000003,H0=Math.PI*2;function k0(i){if(i<.55)return 1-2*i/.55;let e=(i-.55)/(1-.55),t=e*e*(3-2*e),n=2*(1-.55)/.55*e*(1-e)*(1-2*e);return-1+2*t-n}function $r(i,e,t){let n=i/H0%1,s=(n+.5)%1;t[0]=k0(n)*e,t[1]=k0(s)*e;let r=Math.max(n,s),a=r>.55?Math.sin(Math.PI*(r-.55)/(1-.55))**2:0;return t[2]=(r===n?1:-1)*a*e,t}function jr(i){return i.phase+H0*i.marched/(.68*i.size)}var $u=["diver","warden","drill","kestrel","engine"];function G0(){let i=new Wi,e=new Map,t=new Map;function n(s){if(!$u.includes(s)||e.has(s))return Promise.resolve(!0);if(!t.has(s)){let r="./art/"+s+"-skin.webp",a=i.loadAsync(r).catch(()=>i.loadAsync(r)).then(o=>(o.colorSpace=xt,e.set(s,o),!0)).catch(()=>!1).finally(()=>t.delete(s));t.set(s,a)}return t.get(s)}return{get:s=>e.get(s),prepare:n}}function V0(i,e,t){let n=t.clone(),s=[];i.updateMatrixWorld(!0);let r=i.matrixWorld.clone().invert(),a=new We,o=new N,c=.52,l=Math.cos(c),h=Math.sin(c),f=1/0,u=-1/0,d=1/0,p=-1/0;i.traverse(x=>{if(!x.isMesh||x.material!==t)return;let m=x.geometry,g=m.getAttribute("position"),_=m.getAttribute("normal"),y=new Float32Array(g.count*3);a.multiplyMatrices(r,x.matrixWorld);let M=new Je().getNormalMatrix(a);for(let w=0;w<g.count;w++){o.fromBufferAttribute(g,w).applyMatrix4(a);let b=o.y*l-o.z*h;f=Math.min(f,o.x),u=Math.max(u,o.x),d=Math.min(d,b),p=Math.max(p,b),y[3*w]=o.x,y[3*w+1]=b,o.fromBufferAttribute(_,w).applyMatrix3(M).normalize(),y[3*w+2]=$e.smoothstep(o.y*h+o.z*l,-.34,.35)}s.push([m,y,x])});for(let[x,m,g]of s){for(let _=0;_<m.length;_+=3)m[_]=.014+.972*(m[_]-f)/(u-f),m[_+1]=.015+.97*(m[_+1]-d)/(p-d);x.setAttribute("portraitUv",new Ot(m,3)),g.material=n}n.onBeforeCompile=x=>{x.uniforms.paintedSurface={value:e},x.vertexShader=x.vertexShader.replace("#include <common>",`#include <common>
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
        diffuseColor.rgb*=1.+.032*grain;`)}}var W0=`
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
  }`;function X0(i,e){let n={diver:4,warden:2.79,drill:3.13,kestrel:4.55,engine:4.11}[i],s=n*e.image.height/e.image.width,r=new kt({uniforms:{paint:{value:e},motion:{value:new _t},kind:{value:$u.indexOf(i)},fall:{value:0},bodyWidth:{value:n},bodyHeight:{value:s},hit:{value:0}},vertexShader:W0,fragmentShader:`varying vec2 tex;uniform sampler2D paint;uniform float hit;
   void main(){vec4 p=texture2D(paint,tex);if(p.a<.27)discard;gl_FragColor=vec4(mix(p.rgb,vec3(1.,.76,.42),hit*.29),p.a);
   #include <colorspace_fragment>
   }`,side:Ht,alphaToCoverage:!0}),a=new Qe(new zt(1,1,30,30),r);return a.frustumCulled=!1,{mesh:a,pose(o){let c=r.uniforms;c.motion.value.set(i==="kestrel"?o.time*5:o.march*5.6,o.walk*(1-o.down),o.charge,o.release),c.fall.value=o.down,c.hit.value=o.hit}}}var EM={diver:[[.5,.64,.29,.27,1],[.2,.29,.17,.2,.82],[.82,.28,.17,.2,.82],[.5,.49,.15,.13,.62]],warden:[[.5,.7,.36,.32,1.04],[.53,.42,.22,.19,.75],[.64,.44,.12,.19,.98],[.24,.18,.15,.22,.59],[.76,.18,.14,.21,.59]],drill:[[.36,.47,.26,.27,1.02],[.68,.27,.25,.21,.72],[.7,.8,.25,.16,.65]],kestrel:[[.51,.48,.15,.27,.95],[.5,.34,.12,.13,.82],[.3,.18,.15,.17,.5],[.71,.26,.14,.13,.52]],engine:[[.5,.6,.3,.32,.95],[.5,.37,.18,.19,.83],[.31,.82,.14,.18,.65],[.69,.82,.14,.18,.65]]};function wM(i,e,t,n){let r=Math.max(54,Math.round(80*e.image.height/e.image.width)),a=document.createElement("canvas");a.width=81,a.height=r+1;let o=a.getContext("2d",{willReadFrequently:!0});o.drawImage(e.image,0,0,81,r+1);let c=o.getImageData(0,0,81,r+1).data,l=81*(r+1),h=new Float32Array(l);for(let M=0;M<l;M++)h[M]=c[M*4+3]>88?1e3:0;for(let M=1;M<r;M++)for(let w=1;w<80;w++){let b=M*81+w;h[b]=Math.min(h[b],h[b-1]+1,h[b-80-1]+1,h[b-80-2]+1.414)}for(let M=r-1;M>0;M--)for(let w=79;w>0;w--){let b=M*81+w;h[b]=Math.min(h[b],h[b+1]+1,h[b+80+1]+1,h[b+80+2]+1.414)}let f=[],u=[],d=[],p=[],x=new Uint8Array(80*r),m=.64,g=Math.cos(m),_=Math.sin(m);for(let M of[!0,!1])for(let w=0;w<=r;w++)for(let b=0;b<=80;b++){let v=w*81+b,S=b/80,D=1-w/r,I=0;for(let[H,L,K,B,R]of EM[i])I=Math.max(I,R*Math.exp(-1.6*(((S-H)/K)**2+((D-L)/B)**2)));let O=Math.pow(Math.min(1,h[v]/(80*.11)),.6),G=(.28*c[v*4]+.55*c[v*4+1]+.17*c[v*4+2])/255,Y=(.023+O*((i==="kestrel"?.085:.2)+I*.86))*Math.min(1.26,t/3),P=M?Y*(.87+G*.13):-.99*Y,U=D*n;f.push((S-.5)*t,U*g+P*_+.025,.46-U*_+P*g),u.push(S,D),p.push(M?1:0)}for(let M=0;M<r;M++)for(let w=0;w<80;w++){let b=M*81+w;x[M*80+w]=[b,b+1,b+80+1,b+80+2].some(v=>c[v*4+3]>80)?1:0}for(let M=0;M<r;M++)for(let w=0;w<80;w++){if(!x[M*80+w])continue;let b=M*81+w,v=b+1,S=b+80+1,D=S+1;d.push(b,S,v,v,S,D,b+l,v+l,S+l,v+l,D+l,S+l);let I=(O,G)=>d.push(O,G,O+l,G,G+l,O+l);(!w||!x[M*80+w-1])&&I(S,b),(w===79||!x[M*80+w+1])&&I(v,D),(!M||!x[(M-1)*80+w])&&I(b,v),(M===r-1||!x[(M+1)*80+w])&&I(D,S)}let y=new gt;return y.setAttribute("position",new He(f,3)),y.setAttribute("uv",new He(u,2)),y.setAttribute("surface",new He(p,1)),y.setIndex(d),y.computeVertexNormals(),y}function q0(i,e){let t={diver:4.12,warden:2.9,drill:3.15,kestrel:4.43,engine:4.08}[i],n=t*e.image.height/e.image.width,s=wM(i,e,t,n),r=new kt({side:Ht,alphaToCoverage:!0,uniforms:{paint:{value:e},motion:{value:new _t},kind:{value:$u.indexOf(i)},fall:{value:0},bodyWidth:{value:t},bodyHeight:{value:n},hit:{value:0}},vertexShader:W0.replace("varying vec2 tex;","attribute float surface;varying float cap;varying vec3 ns;varying vec2 tex;").replace("tex=uv;","tex=uv;cap=surface;ns=normalize(normalMatrix*normal);").replace("gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);",`
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
     }`}),a=new Qe(s,r);return a.frustumCulled=!1,{mesh:a,pose(o){r.uniforms.motion.value.set(i==="kestrel"?o.time*5:o.march*5.6,o.walk*(1-o.down),o.charge,o.release),r.uniforms.fall.value=o.down,r.uniforms.hit.value=o.hit}}}var bo=new N;function $n(i,e,t,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;bo.copy(e),bo[n]=0,bo.normalize();let l=.5*a/(a+o),h=1-bo.angleTo(i)/c;return Math.sign(bo[t])===1?h*l:o/(a+o)+l+l*(1-h)}var Gc=class i extends Nn{constructor(e=1,t=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new N,l=new N,h=new N(e,t,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=f.length/6,x=new N,m=.5/a;for(let g=0,_=0;g<f.length;g+=3,_+=2)switch(c.fromArray(f,g),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),f[g+0]=h.x*Math.sign(c.x)+l.x*r,f[g+1]=h.y*Math.sign(c.y)+l.y*r,f[g+2]=h.z*Math.sign(c.z)+l.z*r,u[g+0]=l.x,u[g+1]=l.y,u[g+2]=l.z,Math.floor(g/p)){case 0:x.set(1,0,0),d[_+0]=$n(x,l,"z","y",r,n),d[_+1]=1-$n(x,l,"y","z",r,t);break;case 1:x.set(-1,0,0),d[_+0]=1-$n(x,l,"z","y",r,n),d[_+1]=1-$n(x,l,"y","z",r,t);break;case 2:x.set(0,1,0),d[_+0]=1-$n(x,l,"x","z",r,e),d[_+1]=$n(x,l,"z","x",r,n);break;case 3:x.set(0,-1,0),d[_+0]=1-$n(x,l,"x","z",r,e),d[_+1]=1-$n(x,l,"z","x",r,n);break;case 4:x.set(0,0,1),d[_+0]=1-$n(x,l,"x","y",r,e),d[_+1]=1-$n(x,l,"y","x",r,t);break;case 5:x.set(0,0,-1),d[_+0]=$n(x,l,"x","y",r,e),d[_+1]=1-$n(x,l,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};function un(i,e,t,n=0){return n?new Gc(i,e,t,1,n):new Nn(i,e,t)}function vt(i,e,t,n,s,r=null){let a=i.index?i.toNonIndexed():i;a!==i&&i.dispose(),a.deleteAttribute("uv"),r&&a.applyQuaternion(new en().setFromEuler(r)),a.translate(t,n,s);let o=new Ae(e),c=a.getAttribute("position").count,l=new Float32Array(c*3);for(let h=0;h<l.length;h+=3)o.toArray(l,h);return a.setAttribute("color",new Ot(l,3)),a}function hi(i){let e=yo(i,!1);for(let t of i)t.dispose();return e}function ui(i,e,t,n,s=8){let r=new N(...i),a=new N(...e),o=a.clone().sub(r),c=new nn(t,t,o.length(),s);c.applyQuaternion(new en().setFromUnitVectors(new N(0,1,0),o.normalize()));let l=r.lerp(a,.5);return vt(c,n,l.x,l.y,l.z)}var K0=i=>new N(...i),Sn=(i=0,e=0,t=0)=>new $t(i,e,t),J0=Math.PI*2,$0=new Bt({vertexColors:!0,shininess:35,specular:6511190,side:Ht}),TM=new At({vertexColors:!0,toneMapped:!1,side:Ht}),qe=(i,e,t,n,s,r,a,o=null)=>{let c=new si(1,28,16);return c.scale(s,r,a),vt(c,i,e,t,n,o)},Vc=(i,e,t,n,s,r,a,o=.045,c=null)=>vt(un(s,r,a,o),i,e,t,n,c),js=(i,e,t,n,s,r,a,o=null,c=24)=>vt(new nn(s,r,a,c),i,e,t,n,o),Wc=(i,e,t,n,s,r,a=null)=>vt(new ri(s,r,8,32),i,e,t,n,a);function Xc(i,e,t=.04){return vt(new Vs(new Bi(e.map(K0)),Math.max(9,e.length*5),t,8,!1),i,0,0,0)}function Lt(i,e,t,n=14){let s=new Bi(e.map(K0)),r=(e.length-1)*5,a=s.computeFrenetFrames(r,!1),o=[],c=[];for(let h=0;h<=r;h++){let f=h/r,u=s.getPointAt(f),d=f*(t.length-1),p=Math.min(t.length-2,Math.floor(d)),x=$e.lerp(t[p],t[p+1],d-p);for(let m=0;m<n;m++){let g=m*J0/n,_=u.clone().addScaledVector(a.normals[h],x*Math.cos(g)).addScaledVector(a.binormals[h],x*Math.sin(g));if(o.push(_.x,_.y,_.z),h){let y=h*n+m,M=h*n+(m+1)%n;c.push(y-n,M-n,y,M-n,M,y)}}}let l=new gt;return l.setAttribute("position",new He(o,3)),l.setIndex(c),l.computeVertexNormals(),vt(l,i,0,0,0)}function Y0(i,e){let t=[],n=[];for(let r=1;r<i.length-1;r++)for(let a of[0,r,r+1]){t.push(...i[a]);let o=new Ae(e[a%e.length]);n.push(o.r,o.g,o.b)}let s=new gt;return s.setAttribute("position",new He(t,3)),s.setAttribute("color",new He(n,3)),s.computeVertexNormals(),s}function qc(i,e,t,n,s,r,a=0){let o=new nn(.035,s,r,5,1);return o.translate(0,r/2,0),vt(o,i,e,t,n,Sn(0,.2,a))}function AM(){let i=[];function e(a,o=0,c=0,l=0){let h=new Ct;return h.position.set(o,c,l),a?.add(h),h.userData.geometry=[],h.userData.light=[],i.push(h),h}let t=e(null),n=(a,...o)=>a.userData.geometry.push(...o),s=(a,...o)=>a.userData.light.push(...o);function r(){for(let a of i)for(let[o,c]of[["geometry",$0],["light",TM]]){let l=a.userData[o];l.length&&a.add(new Qe(hi(l),c)),delete a.userData[o]}}return{root:t,joint:e,add:n,glow:s,finish:r}}function Qu(i,e,t,n,s,r,a=!0){for(let o of[-1,1])i.add(e,qe("#28313b",o*t,n,s,.15,.106,.095,Sn(0,o*.35,-o*.27))),i.glow(e,qe(r,o*t,n+.006,s+.055,.114,.068,.06,Sn(0,o*.35,-o*.27))),a&&i.add(e,qe("#271f2e",o*t,n,s+.11,.027,.052,.017))}function ju(i,e,t,n,s,r,a=!1){for(let o=0;o<r;o++){let c=n*(o/(r-1)-.5),l=.12+(o===0||o===r-1?.08:0);i.add(e,Lt("#f7dfb0",[[c,s,t-Math.abs(c)*.15],[c*.98,s+(a?1:-1)*l,t+.035]],[.049,.004],8))}}function j0(i,e,t,n,s,r=!1){let a=i.joint(e,...t),[o,c,l]=n,[h,f,u]=s;i.add(a,Lt(f,[[0,0,0],o],[r?.17:.19,.12]),qe(u,...o,.16,.15,.15));let d=i.joint(a,...o),p=c.map((m,g)=>m-o[g]),x=l.map((m,g)=>m-o[g]);return i.add(d,Lt(h,[[0,0,0],p,x],[.13,.092,.009],12)),r?(i.add(a,ui([0,.09,.1],[o[0],o[1]+.085,o[2]+.08],.041,"#e9b277")),i.add(d,ui([0,.03,.06],[p[0],p[1]+.12,p[2]+.05],.042,"#dba26b"),qe(f,...p,.13,.09,.14))):i.add(d,qe(f,...p,.13,.095,.13)),{g:a,shank:d}}function RM(i){let{root:e,joint:t,add:n,glow:s}=i,r=t(e,0,1.04,-.12),a=t(r,0,-.06,.8),o=[],c=[],l="#176f70",h="#30a59a",f="#124e59",u="#f07846",d="#fcbb71";n(r,qe(f,0,-.1,0,1.23,.55,1),qe(l,0,.24,-.05,1.39,.77,1.06),qe(h,0,.48,-.13,1.08,.55,.84));for(let p of[-1,1]){n(r,Lt("#248d87",[[p*.15,.87,.13],[p*.56,1.01,-.17],[p*.72,1.12,-.42]],[.135,.12,.009]));for(let _=0;_<5;_++)n(r,qe("#65ae96",p*(.26+_*.14),.88-_*.07,-.36+_*.032,.055,.039,.075));n(r,Xc("#93c9ac",[[p*.18,.96,.09],[p*.58,.83,.31],[p*1.07,.59,.33],[p*1.26,.29,.19]],.036));for(let _=0;_<3;_++){let y=.4-_*.46;n(r,Lt(h,[[p*1,.32,y],[p*1.36,.38,y-.13],[p*1.45,.58,y-.26]],[.21,.13,.006]));let M=[p*.92,-.09,y];o.push({...j0(i,r,M,[[p*.58,.18,-.14],[p*.91,-.78,.02],[p*1,-.97,.31]],[f,l,u]),phase:_*.98+(p<0?Math.PI:0),s:p})}let x=t(r,p*.9,.06,.39),m=t(x,p*.41,.25,.5);n(x,Lt(f,[[0,0,0],[p*.37,.05,.22],[p*.41,.25,.5]],[.27,.23,.24])),n(m,qe(u,0,.05,.05,.45,.34,.49,Sn(.12,0,-p*.12)),Lt(u,[[p*.23,.12,.2],[p*.39,.22,.55],[p*.33,.31,.89],[-p*.015,.33,1.08]],[.23,.19,.1,.008]),Xc(d,[[p*.29,.23,.32],[p*.39,.33,.62],[p*.24,.37,.9]],.047));let g=t(m,-p*.13,.02,.24);n(g,Lt("#e78954",[[0,0,0],[-p*.18,.02,.32],[-p*.19,.12,.62],[p*.033,.25,.8]],[.19,.16,.095,.007]));for(let _=0;_<4;_++)n(m,qe(d,-p*.02,.29,.07+_*.11,.074,.054,.06));c.push({arm:x,palm:m,finger:g,s:p}),n(r,Lt(f,[[p*.39,.45,.55],[p*.48,.71,.62],[p*.49,.85,.72]],[.13,.095,.08])),n(r,qe(f,p*.49,.86,.74,.22,.16,.17)),s(r,qe("#ffd777",p*.49,.88,.865,.146,.11,.077)),n(r,qe("#333442",p*.49,.9,.927,.036,.078,.02));for(let _=0;_<3;_++)n(a,Lt(d,[[p*(.14+_*.1),.07,.03],[p*(.16+_*.14),-.12,.21],[p*(.13+_*.14),-.29,.27]],[.078,.055,.007]));for(let _=0;_<3;_++){let y=-.39-_*.17;n(r,Wc("#ded5a1",p*(.46+_*.1),.88-_*.06,y,.077,.025,Sn(Math.PI/2,0,0)))}}return n(r,Xc("#a7dac4",[[0,.59,.81],[0,.96,.21],[0,1.01,-.18],[0,.75,-.78]],.034)),p=>{r.position.y=1.04+p.bob*.08-p.down*.29,r.rotation.z=p.stride*.044+p.down*.18,r.rotation.x=-p.cast*.14,o.forEach(({g:x,shank:m,phase:g,s:_})=>{let y=p.beat+g;x.rotation.y=_*.25*Math.sin(y)*p.walk,m.rotation.z=_*(Math.max(0,Math.cos(y))*.28*p.walk+p.down*.45)}),c.forEach(({arm:x,palm:m,finger:g,s:_})=>{x.rotation.x=-.14+.2*p.stride*_-.55*p.cast-.58*p.air+.5*p.down,m.rotation.y=_*(.43-.31*p.cast),g.rotation.y=_*(.17+.37*p.cast+.09*Math.sin(p.time*3))})}}function CM(i){let{root:e,joint:t,add:n,glow:s}=i,r=t(e,0,1.24,-.26),a=t(r,0,.18,.7),o=[],c="#57484b",l="#b67b35",h="#e9b858",f="#ffe3a8";n(r,qe(c,0,.03,-.17,.94,.77,1.36),qe("#8e612f",0,.18,.18,1.04,.84,.94));for(let d=0;d<3;d++){let p=.36-d*.48,x=1-d*.12;n(r,qe(d%2?l:"#c89348",0,.53-d*.09,p,.98*x,.53*x,.55));for(let m of[-1,1])n(r,ui([m*.6*x,.9-d*.1,p+.12],[m*.92*x,.46-d*.1,p+.04],.048,h),qe("#5b5052",m*.9*x,.49-d*.09,p+.11,.07,.07,.07))}n(a,qe(c,0,.11,.27,.64,.63,.68),qe("#866344",0,-.11,.72,.56,.37,.56),qe("#624c41",0,-.2,1.03,.5,.25,.25),Lt(f,[[0,.12,.88],[.08,.43,1.13],[.23,.82,1.37],[.35,1.19,1.4]],[.245,.181,.078,.004]),Lt("#d6ae76",[[0,.45,.6],[0,.67,.69],[0,.87,.78]],[.16,.1,.005]));for(let d of[-1,1]){n(a,qe("#493d42",d*.275,-.16,1.205,.105,.064,.038),Lt(c,[[d*.41,.39,.1],[d*.62,.56,.04],[d*.69,.68,-.13]],[.16,.14,.015]),qe(l,d*.46,.33,.63,.27,.11,.26,Sn(0,d*.42,-d*.31)));for(let p of[-.86,.62]){let x=t(r,d*.64,-.11,p),m=t(x,0,-.54,.05);n(x,qe(c,d*.055,-.19,0,.3,.46,.34),qe(l,d*.12,-.2,.045,.29,.23,.32)),n(m,qe(c,0,-.13,0,.235,.33,.25),qe("#423d43",0,-.39,.095,.267,.16,.34));for(let g=-1;g<=1;g++)n(m,qe("#c3a580",g*.123,-.41,.29,.075,.074,.11));o.push({g:x,knee:m,phase:(p<0?Math.PI:0)+(d<0?Math.PI:0)})}}Qu(i,a,.447,.22,.72,"#ffb333");let u=t(r,0,.12,-1.22);return n(u,Lt(c,[[0,0,0],[.13,-.22,-.34],[.12,-.45,-.47]],[.11,.073,.035]),qe("#342f3a",.12,-.47,-.48,.08,.13,.085)),d=>{r.position.y=1.24+.1*d.bob-.26*d.cast-.35*d.down,r.rotation.z=.06*d.stride+.25*d.down,a.rotation.x=.025+.18*d.stride+.48*d.cast-.47*d.fire+.2*d.down;for(let{g:p,knee:x,phase:m}of o){let g=Math.sin(d.beat+m)*d.walk;p.rotation.x=-g*.39+.25*d.down,x.rotation.x=Math.max(0,g)*.39+.35*d.air}u.rotation.z=.28*Math.sin(d.time*3)}}function IM(i){let{root:e,joint:t,add:n,glow:s}=i,r=[],a=[[.25,2.04,.83,.71],[.45,1.52,.17,.77],[.28,1.05,-.46,.68],[-.32,.69,-.91,.57],[-.84,.53,-1.15,.48],[-1.22,.48,-.87,.32],[-1.39,.57,-.39,.2]];for(let l=0;l<a.length;l++){let[h,f,u,d]=a[l],p=t(e,h,f,u);n(p,qe(l%2?"#623c81":"#654194",0,0,0,d,d*.78,d*.98),qe(l%2?"#a969bd":"#9659af",0,d*.23,-.03,d*1.06,d*.71,d*.64));for(let x of[-1,1])n(p,qe("#50365e",x*d*.78,-.09,.08,d*.21,d*.19,d*.5),qc(l%2?"#cc80ee":"#a17de8",x*d*.62,d*.43,-.1,d*.26,d*.78,-x*.5)),s(p,qe("#edacff",x*d*.72,d*.5,.075,d*.22,d*.043,d*.09));n(p,qc("#e5b0ff",0,d*.62,-.14,d*.23,d*.67,-.12)),r.push(p)}let o=t(r[0],0,.37,.34),c=t(o,0,-.12,.11);n(o,qe("#75469a",0,.18,.02,.69,.49,.61),qe("#9954af",0,.1,.4,.56,.23,.44),qe("#392744",0,-.043,.41,.51,.11,.44)),n(c,qe("#b579ab",0,-.19,.37,.47,.145,.45)),ju(i,o,.67,.83,-.012,7),ju(i,c,.62,.67,-.13,5,!0);for(let l of[-1,1])n(o,Lt("#cea6ef",[[l*.45,.32,.1],[l*.65,.69,-.06],[l*.69,.91,-.32]],[.19,.135,.01]),Lt("#a07ccf",[[l*.48,.11,-.04],[l*.78,.36,-.23],[l*.94,.44,-.49]],[.19,.1,.007]),qe("#b17cba",l*.4,.32,.44,.24,.105,.19,Sn(0,l*.37,-l*.32)));for(let l of[-1,1])n(o,Lt("#c491da",[[l*.18,.31,.63],[l*.39,.42,.54],[l*.66,.5,.24]],[.1,.16,.035]),Lt("#cba7d1",[[l*.49,.09,.31],[l*.67,-.03,.53],[l*.57,-.19,.75]],[.12,.085,.005]));return Qu(i,o,.39,.235,.51,"#a3ffe6"),l=>{r.forEach((h,f)=>{let[,u,d]=a[f];h.position.x=a[f][0]+Math.sin(l.beat*.68-f*.71)*(.13+f*.044)*l.walk,h.position.y=u*(1-.57*l.down-.36*l.cast)+Math.sin(l.beat*.63-f*.73)*.074*l.walk,h.position.z=d+f*.035*l.cast,h.rotation.z=.12*Math.sin(l.beat*.7-f*.61)*l.walk+.27*l.down}),o.rotation.x=-.22*l.cast-.36*l.fire+.1*Math.sin(l.beat)*l.walk,c.rotation.x=.4+.31*l.cast+.36*l.fire+.04*Math.sin(l.time*3)}}function PM(i){let{root:e,joint:t,add:n,glow:s}=i,r=t(e,0,1.72,-.26),a=t(r,0,.4,.8),o=t(a,0,-.16,.28),c=[],l=[],h=[];n(r,qe("#387bab",0,.09,-.08,.65,.59,1.1),qe("#a4d6df",0,-.18,.12,.48,.35,.8),qe("#397aa7",0,.3,.58,.45,.49,.64)),n(a,qe("#599fc2",0,.11,.14,.46,.39,.61),qe("#92cbd6",0,-.01,.5,.38,.2,.47),qe("#296382",0,-.14,.58,.35,.1,.38)),n(o,qe("#b1e3e3",0,-.12,.3,.31,.12,.34)),ju(i,a,.76,.53,-.11,5);for(let u of[-1,1]){n(a,Lt("#e1f3e6",[[u*.28,.27,0],[u*.45,.58,-.24],[u*.48,.72,-.51]],[.13,.085,.006]),Lt("#80d5e1",[[u*.27,.07,-.08],[u*.54,.17,-.25],[u*.66,.22,-.47]],[.14,.08,.01]));let d=t(r,u*.39,.32,.04),p=t(d,u*.75,.4,-.12);n(d,Lt("#5296b7",[[0,0,0],[u*.38,.16,.02],[u*.76,.39,-.12]],[.18,.12,.095]),Y0([[0,0,0],[u*.76,.4,-.12],[u*.68,.1,-.93],[u*.14,-.08,-.76]],["#4a9fc7","#8ddfe5","#3b81b0","#306d9c"]));let x=[[u*1.13,.38,-.3],[u*1.23,.08,-.72],[u*.97,-.11,-1],[u*.4,-.23,-.99]];for(let m=0;m<3;m++){let g=x[m],_=x[m+1],y=g.map((M,w)=>(M+_[w])*.5);y[0]*=.91,y[1]+=.045,y[2]+=.12,n(p,Y0([[0,0,0],g,y,_],["#9ee6e3","#72c6df","#348bb9","#81cfe4"]),Lt("#d0ecdc",[[0,0,0],[g[0]*.56,g[1]*.58+.05,g[2]*.47],g],[.055,.042,.009]))}n(p,Lt("#c5e8df",[[0,0,0],x[3]],[.046,.008]),Lt("#b2e8e2",[[0,0,0],[u*.09,.12,.1],[u*.12,.16,.22]],[.08,.05,.004])),c.push({arm:d,elbow:p,s:u});for(let m of[-.57,.41]){let g=t(r,u*.37,-.23,m);n(g,Lt("#407ea5",[[0,0,0],[u*.12,-.32,.05],[u*.14,-.49,.23]],[.15,.095,.069]));for(let _ of[-1,0,1])n(g,Lt("#dcebd5",[[u*.14,-.49,.23],[u*.15+_*.09,-.57,.38]],[.053,.006]));l.push({leg:g,s:u,z:m})}}for(let u of[-1,1])n(a,Lt("#4b92af",[[u*.11,.24,.55],[u*.31,.32,.47],[u*.48,.39,.21]],[.052,.095,.021]));Qu(i,a,.315,.14,.54,"#f9c45b");let f=r;for(let u=0;u<5;u++){let d=t(f,0,u?-.015:0,u?-.33:-.83),p=.28-u*.042;n(d,Lt("#4789ad",[[0,0,.06],[0,-.025,-.27],[0,.01,-.4]],[p,p*.8,p*.64]),qc("#acdfe4",0,p*.59,-.16,.065,.17-u*.014)),h.push(d),f=d}for(let u=0;u<4;u++)n(r,qc("#d5ede7",0,.5,.41-u*.31,.084,.23));return u=>{let d=Math.sin(u.time*4.9);r.position.y=1.7+.1*d*(1-u.down)-.69*u.down-.3*u.cast,r.rotation.x=-.13*u.cast+.17*u.fire+.18*u.down,a.rotation.x=.1*Math.sin(u.time*2.4)+.32*u.fire,o.rotation.x=.08+.36*u.cast+.4*u.fire;for(let{arm:p,elbow:x,s:m}of c)p.rotation.z=m*(.06+.32*d*(1-u.down)+.39*u.cast-.65*u.down),x.rotation.y=m*(.12+.12*Math.sin(u.time*4.9-.6)+.7*u.down);for(let{leg:p,s:x,z:m}of l)p.rotation.x=.32+.13*Math.sin(u.beat+x+(m>0?Math.PI:0))+.35*u.air;h.forEach((p,x)=>p.rotation.y=.16*Math.sin(u.time*3-x*.6))}}function LM(i){let{root:e,joint:t,add:n,glow:s}=i,r=t(e,0,1.14,-.17),a=[],o=[],c=t(r,0,.14,.88),l="#394955",h="#8a4239",f="#d09253",u="#27313d",d="#ffc669";n(r,qe(u,0,0,-.06,.99,.63,1.15),qe(h,0,.24,-.15,1.06,.68,1.08));for(let p=0;p<3;p++)n(r,js(p===1?f:l,0,.6+p*.13,-.22,.71-p*.075,.74-p*.073,.15),Wc("#c4874f",0,.65+p*.13,-.22,.705-p*.072,.043,Sn(Math.PI/2)));n(r,js(u,0,.98,-.22,.48,.56,.11)),s(r,js("#ff9642",0,1.035,-.22,.414,.414,.035));for(let p=-2;p<=2;p++)n(r,Vc(l,p*.14,1.07,-.22,.052,.04,.66-.09*Math.abs(p),.014));n(c,js(u,0,0,.1,.54,.54,.27,Sn(Math.PI/2)),Wc(f,0,0,.265,.48,.077)),s(c,qe("#ff8235",0,0,.245,.39,.39,.105),qe("#ffe395",0,0,.326,.17,.17,.054));for(let p=0;p<8;p++){let x=p*J0/8;n(c,Vc(l,Math.cos(x)*.32,Math.sin(x)*.32,.35,.24,.066,.053,.016,Sn(0,0,x+.32)))}for(let p of[-1,1]){for(let m=0;m<4;m++){let g=.62-m*.45,_=[p*(.5+Math.sin(m*Math.PI/3)*.12),.39,g*.42],y=[p*(.9+Math.sin(m*Math.PI/3)*.18),-.75,g*.78];a.push({...j0(i,r,[p*.75,-.06,g],[_,y,[y[0]+p*.16,-1.04,y[2]+.27]],[l,h,f],!0),s:p,phase:m*1.5+(p<0?Math.PI:0)})}let x=t(r,p*.74,.56,-.25);o.push({g:x,s:p}),n(x,js(l,0,.28,0,.245,.265,.76,Sn(.26)),js(f,0,.62,.095,.258,.26,.13,Sn(.26)),js(u,0,.72,.118,.22,.22,.1,Sn(.26)),Wc("#e4a361",0,.78,.132,.232,.045,Sn(Math.PI/2+.26)),Xc(f,[[p*.17,0,-.1],[p*.27,.28,-.12],[p*.2,.46,-.06]],.05)),s(x,qe(d,0,.742,.13,.142,.042,.14)),n(r,Vc(h,p*.76,.3,.45,.47,.43,.52,.1,Sn(0,p*.16,-p*.25)));for(let m=0;m<3;m++)s(r,Vc("#ffa64f",p*(.67+m*.075),.31,.72,.036,.18,.033,.007,Sn(0,0,-p*.18)))}return p=>{r.position.y=1.14+.066*p.bob-.15*p.cast-.42*p.down,r.rotation.z=.042*p.stride+.21*p.down,c.rotation.z=.14*p.time+.67*p.cast,a.forEach(({g:x,shank:m,s:g,phase:_})=>{let y=p.beat+_;x.rotation.y=g*.22*Math.sin(y)*p.walk,m.rotation.z=g*(.25*Math.max(0,Math.cos(y))*p.walk+.36*p.down)}),o.forEach(({g:x,s:m})=>{x.rotation.x=.17+.4*p.cast-.25*p.fire,x.rotation.z=m*(.18+.12*p.down),x.position.y=.56-.14*p.fire})}}var Z0={diver:RM,warden:CM,drill:IM,kestrel:PM,engine:LM};function Q0(i,e){let t=new Map,n;return function(r,a){if(n!==r){let u=t.get(n);if(u&&(u.root.visible=!1,u.volume&&(u.volume.mesh.visible=u.portrait.mesh.visible=!1)),Z0[r]&&!t.has(r)){let d=AM(),p=Z0[r](d);d.finish(),i.add(d.root),t.set(r,{root:d.root,sample:p})}n=r}let o=t.get(r);if(!o)return!1;let c=e.get(r);!o.volume&&c&&(V0(o.root,c,$0),o.volume=q0(r,c),o.portrait=X0(r,c),i.add(o.volume.mesh,o.portrait.mesh));let l=a.march*4.35,h=$e.smoothstep(a.defeat,.12,.94);if(o.volume){o.portrait.mesh.visible=a.mode==="ai",o.volume.mesh.visible=!o.portrait.mesh.visible;let u=$e.smoothstep(h,.3,.92);o.root.visible=o.volume.mesh.visible&&u>.01,o.root.scale.set(.63*u,.66*u,.68*u),o.root.position.set(0,.07,-.95),(o.portrait.mesh.visible?o.portrait:o.volume).pose({...a,down:h})}else o.root.visible=!0,o.root.scale.setScalar(1),o.root.position.set(0,0,0);if(!o.root.visible)return!0;let f=Math.sin(Math.PI*$e.clamp((a.vault-.21)/.89,0,1))+Math.sin(Math.PI*$e.clamp((a.attack-.23)/.65,0,1));return o.sample({time:a.time,beat:l,walk:a.walk*(1-h),stride:Math.sin(l)*a.walk*(1-h),bob:(.5-.5*Math.cos(l*2))*a.walk,down:h,air:f,cast:a.charge||0,fire:a.release||0}),!0}}function em(i){let e=new Map,t=new Map,n=i.clone();return tm(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function tm(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)tm(i.children[n],e.children[n],t)}var Yc=class extends _i{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new of(t)}),this.register(function(t){return new lf(t)}),this.register(function(t){return new cf(t)}),this.register(function(t){return new _f(t)}),this.register(function(t){return new vf(t)}),this.register(function(t){return new yf(t)}),this.register(function(t){return new uf(t)}),this.register(function(t){return new ff(t)}),this.register(function(t){return new df(t)}),this.register(function(t){return new pf(t)}),this.register(function(t){return new af(t)}),this.register(function(t){return new mf(t)}),this.register(function(t){return new hf(t)}),this.register(function(t){return new xf(t)}),this.register(function(t){return new gf(t)}),this.register(function(t){return new sf(t)}),this.register(function(t){return new Zc(t,ut.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Zc(t,ut.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Mf(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Xi.extractUrlBase(e);a=Xi.resolveURL(l,this.path)}else a=Xi.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new zr(this.manager);c.setPriority(this.priority),c.setCache(this.cache),c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===am){try{a[ut.KHR_BINARY_GLTF]=new bf(e)}catch(f){s&&s(f);return}r=JSON.parse(a[ut.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Cf(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let f=this.pluginCallbacks[h](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[f.name]=f,a[f.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let f=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(f){case ut.KHR_MATERIALS_UNLIT:a[f]=new rf;break;case ut.KHR_DRACO_MESH_COMPRESSION:a[f]=new Sf(r,this.dracoLoader);break;case ut.KHR_TEXTURE_TRANSFORM:a[f]=new Ef;break;case ut.KHR_MESH_QUANTIZATION:a[f]=new wf;break;default:u.indexOf(f)>=0&&o[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function NM(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Wt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var ut={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DIFFUSE_ROUGHNESS:"KHR_materials_diffuse_roughness",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},sf=class{constructor(e){this.parser=e,this.name=ut.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Ae(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Rn);let f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new fs(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new so(h),l.distance=f;break;case"spot":l=new io(h),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Si(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},rf=class{constructor(){this.name=ut.KHR_MATERIALS_UNLIT}getMaterialType(){return At}extendParams(e,t,n){let s=[];e.color=new Ae(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Rn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,xt))}return Promise.all(s)}},af=class{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},of=class{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ae(r,r)}return Promise.all(s)}},lf=class{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.diffuseRoughness=n.diffuseRoughnessFactor!==void 0?n.diffuseRoughnessFactor:0,n.diffuseRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"diffuseRoughnessMap",n.diffuseRoughnessTexture)),Promise.all(s)}},cf=class{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},hf=class{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},uf=class{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_SHEEN}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new Ae(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Rn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,xt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},ff=class{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},df=class{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_VOLUME}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Ae().setRGB(r[0],r[1],r[2],Rn),Promise.all(s)}},pf=class{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_IOR}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},mf=class{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new Ae().setRGB(r[0],r[1],r[2],Rn),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,xt)),Promise.all(s)}},gf=class{constructor(e){this.parser=e,this.name=ut.EXT_MATERIALS_BUMP}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},xf=class{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Wt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=Wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},_f=class{constructor(e){this.parser=e,this.name=ut.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},vf=class{constructor(e){this.parser=e,this.name=ut.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},yf=class{constructor(e){this.parser=e,this.name=ut.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Zc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,f=s.byteStride,u=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,f,u,s.mode,s.filter).then(function(d){return d.buffer}):a.ready.then(function(){let d=new ArrayBuffer(h*f);return a.decodeGltfBuffer(new Uint8Array(d),h,f,u,s.mode,s.filter),d})})}else return null}},Mf=class{constructor(e){this.name=ut.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==jn.TRIANGLES&&l.mode!==jn.TRIANGLE_STRIP&&l.mode!==jn.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),f=h.isGroup?h.children:[h],u=l[0].count,d=[];for(let p of f){let x=new We,m=new N,g=new en,_=new N(1,1,1),y=new hn(p.geometry,p.material,u);for(let w=0;w<u;w++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,w),c.ROTATION&&g.fromBufferAttribute(c.ROTATION,w),c.SCALE&&_.fromBufferAttribute(c.SCALE,w),y.setMatrixAt(w,x.compose(m,g,_));let M=null;for(let w in c)if(w==="_COLOR_0"){let b=c[w];y.instanceColor=new cn(b.array,b.itemSize,b.normalized)}else if(w!=="TRANSLATION"&&w!=="ROTATION"&&w!=="SCALE"){if(M===null){let v=y.geometry;M=new gt,M.name=v.name;for(let S in v.attributes)M.setAttribute(S,v.attributes[S]);for(let S in v.morphAttributes)M.morphAttributes[S]=v.morphAttributes[S];v.index!==null&&M.setIndex(v.index),M.morphTargetsRelative=v.morphTargetsRelative;for(let S of v.groups)M.addGroup(S.start,S.count,S.materialIndex);v.boundingBox!==null&&(M.boundingBox=v.boundingBox.clone()),v.boundingSphere!==null&&(M.boundingSphere=v.boundingSphere.clone()),M.drawRange.start=v.drawRange.start,M.drawRange.count=v.drawRange.count,M.userData=Object.assign({},v.userData),y.geometry=M}let b=c[w];M.setAttribute(w,new cn(b.array,b.itemSize,b.normalized))}Pt.prototype.copy.call(y,p),this.parser.assignFinalMaterial(y),d.push(y)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},am="glTF",So=12,nm={JSON:1313821514,BIN:5130562},bf=class{constructor(e){this.name=ut.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,So),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==am)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-So,r=new DataView(e,So),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===nm.JSON){let l=new Uint8Array(e,So+a,o);this.content=n.decode(l)}else if(c===nm.BIN){let l=So+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Sf=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ut.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let f=Af[h]||h.toLowerCase();o[f]=a[h]}for(let h in e.attributes){let f=Af[h]||h.toLowerCase();if(a[h]!==void 0){let u=n.accessors[e.attributes[h]],d=Qr[u.componentType];l[f]=d.name,c[f]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(f,u){s.decodeDracoFile(h,function(d){for(let p in d.attributes){let x=d.attributes[p],m=c[p];m!==void 0&&(x.normalized=m)}f(d)},o,l,Rn,u)})})}},Ef=class{constructor(){this.name=ut.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},wf=class{constructor(){this.name=ut.KHR_MESH_QUANTIZATION}},Kc=class extends xi{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=s-t,f=(n-t)/h,u=f*f,d=u*f,p=e*l,x=p-l,m=-2*d+3*u,g=d-u,_=1-m,y=g-u+f;for(let M=0;M!==o;M++){let w=a[x+M+o],b=a[x+M+c]*h,v=a[p+M+o],S=a[p+M]*h;r[M]=_*w+y*b+m*v+g*S}return r}},DM=new en,Tf=class extends Kc{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return DM.fromArray(r).normalize().toArray(r),r}},jn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Qr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},im={9728:Xt,9729:qt,9984:Jl,9985:Xr,9986:Ks,9987:Un},sm={33071:Yn,33648:Sr,10497:mi},ef={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Af={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},xs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},UM={CUBICSPLINE:void 0,LINEAR:Us,STEP:Ds},tf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function FM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new zi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:vi})),i.DefaultMaterial}function Qs(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Si(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function OM(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let f=e[l];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(s=!0),f.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let f=e[l];if(n){let u=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):i.attributes.position;a.push(u)}if(s){let u=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):i.attributes.normal;o.push(u)}if(r){let u=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):i.attributes.color;c.push(u)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],f=l[1],u=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=f),r&&(i.morphAttributes.color=u),i.morphTargetsRelative=!0,i})}function BM(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function zM(i){let e,t=i.extensions&&i.extensions[ut.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+nf(t.attributes):e=i.indices+":"+nf(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+nf(i.targets[n]);return e}function nf(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Rf(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function kM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var HM=new We,Cf=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new NM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?(this.textureLoader=new Wi(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new ro(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new zr(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType("arraybuffer"),(this.options.withCredentials||this.options.crossOrigin==="use-credentials")&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Qs(r,o,s),Si(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ut.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(Xi.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=ef[s.type],o=Qr[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new Ot(l,a,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=ef[s.type],l=Qr[s.componentType],h=l.BYTES_PER_ELEMENT,f=h*c,u=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0,x,m;if(d&&d!==f){let g=Math.floor(u/d),_="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+g+":"+s.count,y=t.cache.get(_);y||(x=new l(o,g*d,s.count*d/h),y=new Cr(x,d/h),t.cache.add(_,y)),m=new Ir(y,c,u%d/h,p)}else o===null?x=new l(s.count*c):x=new l(o,u,s.count*c),m=new Ot(x,c,p);if(s.sparse!==void 0){let g=ef.SCALAR,_=Qr[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,M=s.sparse.values.byteOffset||0,w=new _(a[1],y,s.sparse.count*g),b=new l(a[2],M,s.sparse.count*c);o!==null&&(m=new Ot(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let v=0,S=w.length;v<S;v++){let D=w[v];if(m.setX(D,b[v*c]),c>=2&&m.setY(D,b[v*c+1]),c>=3&&m.setZ(D,b[v*c+2]),c>=4&&m.setW(D,b[v*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=p}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let u=(r.samplers||{})[a.sampler]||{};return h.magFilter=im[u.magFilter]||qt,h.minFilter=im[u.minFilter]||Un,h.wrapS=sm[u.wrapS]||mi,h.wrapT=sm[u.wrapT]||mi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Xt&&h.minFilter!==qt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=s.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1,h;if(t.isKTX2Loader===!0&&a.bufferView!==void 0)h=n.getDependency("bufferView",a.bufferView).then(function(u){return new Promise(function(d,p){t.parse(u,d,p)})});else{if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");h=Promise.resolve(c).then(function(u){return new Promise(function(d,p){let x=d;t.isImageBitmapLoader===!0&&(x=function(m){let g=new tn(m);g.needsUpdate=!0,d(g)}),t.load(Xi.resolveURL(u,r.path),x,void 0,p)})})}let f=h.then(function(u){return l===!0&&o.revokeObjectURL(c),Si(u,a),u.userData.mimeType=a.mimeType||kM(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=f,f}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[ut.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[ut.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[ut.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Dr,yn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Nr,yn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return zi}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[ut.KHR_MATERIALS_UNLIT]){let f=s[ut.KHR_MATERIALS_UNLIT];a=f.getMaterialType(),l.push(f.extendParams(o,r,t))}else{let f=r.pbrMetallicRoughness||{};if(o.color=new Ae(1,1,1),o.opacity=1,Array.isArray(f.baseColorFactor)){let u=f.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],Rn),o.opacity=u[3]}f.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",f.baseColorTexture,xt)),o.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,o.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",f.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",f.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Ht);let h=r.alphaMode||tf.OPAQUE;if(h===tf.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===tf.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==At&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ae(1,1),r.normalTexture.scale!==void 0)){let f=r.normalTexture.scale;o.normalScale.set(f,f)}if(r.occlusionTexture!==void 0&&a!==At&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==At){let f=r.emissiveFactor;o.emissive=new Ae().setRGB(f[0],f[1],f[2],Rn)}return r.emissiveTexture!==void 0&&a!==At&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,xt)),Promise.all(l).then(function(){let f=new a(o);return r.name&&(f.name=r.name),Si(f,r),t.associations.set(f,{materials:e}),r.extensions&&Qs(s,f,r),f})}createUniqueName(e){let t=Ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[ut.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return rm(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=zM(l),f=s[h];if(f)a.push(f.promise);else{let u;l.extensions&&l.extensions[ut.KHR_DRACO_MESH_COMPRESSION]?u=r(l):u=rm(new gt,l,t),l.mode===jn.TRIANGLE_STRIP?u=u.then(d=>Ju(d,mo)):l.mode===jn.TRIANGLE_FAN&&(u=u.then(d=>Ju(d,Yr))),s[h]={primitive:l,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?FM(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],f=[];for(let d=0,p=h.length;d<p;d++){let x=h[d],m=a[d],g,_=l[d];if(m.mode===jn.TRIANGLES||m.mode===jn.TRIANGLE_STRIP||m.mode===jn.TRIANGLE_FAN||m.mode===void 0){let y=r.isSkinnedMesh===!0,M=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");y&&M===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),g=y&&M?new La(x,_):new Qe(x,_),g.isSkinnedMesh===!0&&g.normalizeSkinWeights()}else if(m.mode===jn.LINES)g=new Da(x,_);else if(m.mode===jn.LINE_STRIP)g=new Bs(x,_);else if(m.mode===jn.LINE_LOOP)g=new Ua(x,_);else if(m.mode===jn.POINTS)g=new Fa(x,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&BM(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),Si(g,r),m.extensions&&Qs(s,g,m),t.assignFinalMaterial(g),f.push(g)}for(let d=0,p=f.length;d<p;d++)t.associations.set(f[d],{meshes:e,primitives:d});if(f.length===1)return r.extensions&&Qs(s,f[0],r),f[0];let u=new Ct;r.extensions&&Qs(s,u,r),t.associations.set(u,{meshes:e});for(let d=0,p=f.length;d<p;d++)u.add(f[d]);return u})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Qt($e.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Xs(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Si(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let f=a[l];if(f){o.push(f);let u=new We;r!==null&&u.fromArray(r.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Na(o,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let f=0,u=s.channels.length;f<u;f++){let d=s.channels[f],p=s.samplers[d.sampler],x=d.target,m=x.node,g=s.parameters!==void 0?s.parameters[p.input]:p.input,_=s.parameters!==void 0?s.parameters[p.output]:p.output;x.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",g)),c.push(this.getDependency("accessor",_)),l.push(p),h.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(f){let u=f[0],d=f[1],p=f[2],x=f[3],m=f[4],g=[];for(let y=0,M=u.length;y<M;y++){let w=u[y],b=d[y],v=p[y],S=x[y],D=m[y];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let I=n._createAnimationTracks(w,b,v,S,D);if(I)for(let O=0;O<I.length;O++)g.push(I[O])}let _=new eo(r,void 0,g);return Si(_,s),_})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],f=l[1],u=l[2];u!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(u,HM)});for(let d=0,p=f.length;d<p;d++)h.add(f[d]);if(h.userData.pivot!==void 0&&f.length>0){let d=h.userData.pivot,p=f[0];h.pivot=new N().fromArray(d),h.position.x-=d[0],h.position.y-=d[1],h.position.z-=d[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new Pr:l.length>1?h=new Ct:l.length===1?h=l[0]:h=new Pt,h!==l[0])for(let f=0,u=l.length;f<u;f++)h.add(l[f]);if(r.name&&(h.userData.name=r.name,h.name=a),Si(h,r),r.extensions&&Qs(n,h,r),r.matrix!==void 0){let f=new We;f.fromArray(r.matrix),h.applyMatrix4(f)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let f=s.associations.get(h);s.associations.set(h,{...f})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Ct;n.name&&(r.name=s.createUniqueName(n.name)),Si(r,n),n.extensions&&Qs(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,f=c.length;h<f;h++){let u=c[h];u.parent!==null?r.add(em(u)):r.add(u)}let l=h=>{let f=new Map;for(let[u,d]of s.associations)(u instanceof yn||u instanceof tn)&&f.set(u,d);return h.traverse(u=>{let d=s.associations.get(u);d!=null&&f.set(u,d)}),f};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}xs[r.path]===xs.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let h;switch(xs[r.path]){case xs.weights:h=Hi;break;case xs.rotation:h=Gi;break;case xs.translation:case xs.scale:h=us;break;default:n.itemSize===1?h=Hi:h=us;break}let f=s.interpolation!==void 0?UM[s.interpolation]:Us,u=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){let x=new h(c[d]+"."+xs[r.path],t.array,u,f);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Rf(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Gi?Tf:Kc;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function GM(i,e,t){let n=e.attributes,s=new Hn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new N(c[0],c[1],c[2]),new N(l[0],l[1],l[2])),o.normalized){let h=Rf(Qr[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new N,c=new N;for(let l=0,h=r.length;l<h;l++){let f=r[l];if(f.POSITION!==void 0){let u=t.json.accessors[f.POSITION],d=u.min,p=u.max;if(d!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),u.normalized){let x=Rf(Qr[u.componentType]);c.multiplyScalar(x)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new Ln;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function rm(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(let a in n){let o=Af[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return ht.workingColorSpace!==Rn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ht.workingColorSpace}" not supported.`),Si(i,e),GM(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?OM(i,e.targets,t):i})}async function om(){let{scene:i}=await new Yc().loadAsync("./art/brawler.glb"),e=G0(),t=m=>i.getObjectByName(m),n=t("Pelvis"),s=t("Spine"),r=t("Head"),a=n.position.y,o=["L","R"].map(m=>Object.fromEntries(["Hip","Knee","Ankle","Arm","Elbow","Wrist"].map(g=>[g,t(g+m)]))),c=t("Brawler");c.frustumCulled=!1;let l=c.material;l.color.setScalar(.7),l.bumpMap=l.map,l.bumpScale=.016,l.emissiveMap=l.map,l.emissive.setScalar(.3);let h=new Or;h.moveTo(-.17,-.125),h.lineTo(.17,-.125),h.quadraticCurveTo(.21,-.125,.21,-.088),h.lineTo(.21,.092),h.quadraticCurveTo(.21,.125,.17,.125),h.lineTo(-.17,.125),h.quadraticCurveTo(-.21,.125,-.21,.086),h.lineTo(-.21,-.086),h.quadraticCurveTo(-.21,-.125,-.17,-.125);let f=new zs;f.moveTo(-.145,-.072),f.lineTo(-.145,.072),f.lineTo(.145,.072),f.lineTo(.145,-.072),f.closePath(),h.holes.push(f);let u=new Qe(new Ka(h,{depth:.027,bevelThickness:.009,bevelSize:.009,bevelSegments:2}),new zi({color:12166028,metalness:.37,roughness:.52}));u.position.set(0,.15,.85),u.rotation.x=-.11,n.add(u);let d=Q0(i,e),p=new Float32Array(3);function x({time:m,walk:g,march:_,attack:y,hit:M,defeat:w,kind:b="bruiser",vault:v=0,brace:S=0,drive:D=0,charge:I=0,release:O=0,mode:G}){let Y=d(b,{time:m,walk:g,march:_,attack:y,defeat:w,vault:v,charge:I,release:O,mode:G,hit:M});if(c.visible=u.visible=!Y,Y)return;let P=Math.min(1,v/1.35),U=Math.sin(Math.PI*Math.max(0,Math.min(1,(v-.21)/.89))),H=It(v,0,.14)*(1-It(v,.14,.32)),L=It(v,1.04,1.13)*(1-It(v,1.14,1.35)),K=1-It(w,0,.38),B=K*It(y,0,.19)*(1-It(y,.2,.3+.1)),R=K*Math.sin(Math.PI*Uo(y)),C=K*It(y,.11,.53)*(1-It(y,.68,.91)),$=K*It(y,.68,.91)*(1-It(y,1.01,1.48)),Me=K*It(y,.91,1)*(1-It(y,1.01,1.39)),q=It(w,.12,.58),le=It(w,.82,1.34),Ee=g*(1-It(y,.015,.16)+It(y,1.32,1.48))*(1-q)*(1-.9*Math.sin(Math.PI*P)),Be=.41,ce=_==null?m*6.75:_*Math.PI*.55/Be;$r(ce,Ee,p);let Ie=p[0];n.position.y=a+(-.105+(.5-.5*Math.cos(2*ce))*.047)*Ee-.3*B-.48*Me-.17*q-.32*H-.26*L,n.rotation.set(.055*B-.075*R,Ie*.105,Ie*.043-q*.075),s.rotation.set(.06+.24*H+.19*L-.14*U+.13*D+.24*B-.18*C+.42*$-.084*M,-Ie*.16,-.057*Ie-.16*q),b==="bruiser"&&(s.rotation.x+=.16*I+.31*O),r.rotation.set(-.29-.12*B+.07*C-.34*$+.21*q,Ie*.052,.032*Ie);for(let[dt,Pe]of o.entries()){let je=dt?1:-1,et=p[dt],te=Math.max(0,(dt===0?1:-1)*p[2]),re=-Pe.Knee.position.y,se=-Pe.Ankle.position.y,we=re+se+n.position.y-a-te*.22,ue=Be*et,Xe=Math.min(re+se-1e-5,Math.hypot(we,ue)),Ce=ct=>Math.acos($e.clamp(ct,-1,1)),nt=Math.atan2(-ue,we)-Ce((re*re+Xe*Xe-se*se)/(2*re*Xe)),it=Math.PI-Ce((re*re+se*se-Xe*Xe)/(2*re*se));Pe.Hip.rotation.x=nt-(.62+dt*.13)*U-(.6+dt*.11)*R+je*.27*q,Pe.Knee.rotation.x=it+.78*U+.22*L+.86*R+.22*q,Pe.Ankle.rotation.x=-nt-it+.19*et-.31*R,Pe.Arm.rotation.set(.37*et-.76*U+.18*H-(dt?0:.82)*S-(dt?.65:0)*D-.24*B-(2.04+dt*.09)*C-.38*$,je*(.23*C+.1*$+.22*U),je*(.035+.12*B+.28*C+.055*$+.69*q-.26*le)),Pe.Elbow.rotation.x=-.26-.17*Math.max(0,-et)-.4*B-.65*C+.12*$-.4*q,Pe.Arm.rotation.x-=1.36*I+.11*O,Pe.Elbow.rotation.x-=.34*I,Pe.Wrist.rotation.set(-.24-.13*C+.22*$,je*.58*C,je*(.075*et+.11*C))}l.emissive.setRGB(.3+M*.36,.3+M*.21,.3+M*.12)}return{root:i,pose:x,prepare:e.prepare}}var lm=new Bt({vertexColors:!0,shininess:33,specular:5527131}),er=(i=0,e=0,t=0)=>new $t(i,e,t),dn=(i,e,t,n,s,r,a,o=0,c=null)=>vt(un(i,e,t,o),n,s,r,a,c),En=(i,e,t,n,s,r,a,o=null,c=16)=>vt(new nn(i,e,t,c),n,s,r,a,o),cm=(i,e,t,n,s,r,a=null)=>vt(new ri(i,e,7,30),t,n,s,r,a),If=i=>new Qe(hi(i),lm),Ei="#506272",_s="#e4aa48",$c="#f6dda0",Jc="#394655",hm="#b78053",Hw=$e.clamp;function XM(i,e=4.4,t=1){let n=[],s=[],r=[];if(i==="gap"||i==="bridge"){let a=e/2;for(let c of[-1,1]){n.push(dn(4.22,.43,.25,Ei,0,-.2,c*(a+.04),.035));for(let l=-3;l<=3;l++)n.push(dn(.29,.025,.19,l%2?_s:Jc,l*.53,.025,c*(a+.21),0,er(0,.23,0)));for(let l of[-1,1]){let h=l*1.97;n.push(dn(.2,.83,.24,Jc,h,-.39,c*a,.025),ui([h,-.85,c*a],[h,-.1,c*(a+.65)],.055,Ei))}}let o=Math.round(e/.4);for(let c=0;c<o;c++){let l=(c+.5)*e/o;s.push(dn(4.03,.14,e/o-.025,c%3===0?"#c59762":hm,0,.01,l,.018));for(let h of[-1.54,1.54])s.push(En(.056,.056,.015,Ei,h,.085,l,null,7))}for(let c of[-1.5,1.5])s.push(dn(.19,.28,e,Ei,c,-.14,a,.024));if(i==="bridge"){for(let c of[-1,1]){let l=c*1.92;n.push(dn(.21,1.72,.34,Ei,l,.82,-a,.04),En(.23,.23,.12,_s,l,1.68,-a,er(0,0,Math.PI/2)),ui([l,.12,-a-.42],[l,1.3,-a],.054,$c))}n.push(En(.16,.16,3.9,Ei,0,.11,-a,er(0,0,Math.PI/2))),n.push(dn(1.33,.61,.41,Ei,0,.33,a+.24,.055),dn(1.45,.09,.48,_s,0,.64,a+.24,.025))}else for(let c=0;c<5;c++)n.push(ui([c*.63-1.25,-.11,-a],[c*.63-1.21,-.18,-a+.28+c%2*.18],.024,Ei,6))}else if(i==="cache"){for(let a=0;a<3;a++)for(let o=0;o<5;o++){let c=["#af7149","#ba8051","#cf955f","#a56745"];n.push(dn(.643,.366,.65,c[(o+2*a)%4],(o-2)*.665,.22+a*.385,0,.033))}for(let a of[-1.53,1.53]){n.push(dn(.17,1.24,.75,_s,a,.6,0,.035));for(let o of[.19,.57,1.02])n.push(En(.047,.047,.034,$c,a,o,.389,er(Math.PI/2),8))}n.push(dn(3.38,.11,.72,Jc,0,1.18,0,.025),dn(1.7,.61,.07,Jc,0,.63,.345,.055))}else if(i==="coil"){n.push(En(.78,.9,.22,Ei,0,.12,0,null,28),En(.26,.34,.96,"#b2d5ce",0,.68,0,null,28));for(let a=0;a<7;a++)n.push(cm(.39-a*.016,.044,a%2?"#cc8548":"#f3b867",0,.3+a*.115,0,er(Math.PI/2)));n.push(En(.25,.3,.2,_s,0,1.19,0),vt(new Hs(.21,1),"#96ffff",0,1.39,0))}else if(i==="belt"){n.push(dn(3.9,.065,e,"#697981",0,.035,0,.045));for(let a of[-1.92,1.92])n.push(dn(.1,.11,e,_s,a,.074,0,.022));for(let a=0;a<11;a++)n.push(dn(3.74,.045,.055,"#475765",0,.08,(a-5)*e/11));for(let a=0;a<5;a++)for(let o of[-1,1])r.push(ui([-.24*t,.107,(a-2)*1.53+o*.3],[.24*t,.107,(a-2)*1.53],.052,$c,6))}return{base:If(n),deck:s.length?If(s):null,arrows:r.length?If(r):null}}function qM(){let i=document.createElement("canvas");i.width=320,i.height=104;let e=i.getContext("2d"),t=new Gn(i);t.colorSpace=xt;let n=new Qe(new zt(1.56,.51),new At({map:t,transparent:!0,depthWrite:!1,toneMapped:!1})),s="";return{mesh:n,label(r){r!==s&&(s=r,e.clearRect(0,0,320,104),e.font='900 69px "Arial Black","PingFang SC","Microsoft YaHei",sans-serif',e.textAlign="center",e.textBaseline="middle",e.lineWidth=9,e.strokeStyle="#2e3b48",e.strokeText(r,160,56),e.fillStyle="#fff3cf",e.fillText(r,160,56),t.needsUpdate=!0)},dispose(){t.dispose(),n.geometry.dispose(),n.material.dispose()}}}function YM(i){let e=ar[i],t=[];for(let n of[-1,1]){let s=n*6.68;if(t.push(dn(.25,4.6,.38,e.frame,s,-2.36,0,.025),ui([s,-2.4,0],[s,-.3,2.1],.085,e.frame)),i==="timber"){for(let r of[0,.45])t.push(En(.13,.18,2,"#956b48",s+n*r,-.4,1.3+r,null,9));t.push(ui([s,.32,1.3],[s,.28,4.9],.046,"#bda77e"));for(let[r,a]of[[2.1,1.8],[1.5,3]]){t.push(En(.15,.19,1.8,hm,s+n*a,-3,1+a,null,7));for(let o=0;o<3;o++)t.push(vt(new hs(.77-o*.18,r*.57,8),["#477b62","#599170","#79a181"][o],s+n*a,-2.65+o*.45,1+a))}}else if(i==="quarry"||i==="cinder"||i==="ice"){for(let r=0;r<4;r++){let a=new hs(.58+r*.13,1.4+r%2*1.3,i==="ice"?5:7);t.push(vt(a,i==="ice"?["#85bdce","#b2dce4"][r%2]:r%2?e.frame:e.joint,s+n*(1+r*.55),-2.5+.28*r,r*1.35,er(.09*r,.6*r,n*.16)))}i==="cinder"&&t.push(En(.23,.34,.49,"#c78047",s,-.02,0),En(.18,.21,.14,"#ffcb76",s,.28,0))}else i==="forge"?t.push(En(.28,.28,3.5,"#657f8e",s+n*.36,-.53,.4,er(Math.PI/2)),cm(.32,.056,_s,s+n*.36,-.53,1.75),dn(.46,.51,.44,Ei,s,.21,0,.045)):(t.push(En(.18,.24,.48,"#737f85",s,.13,0),En(.27,.25,.11,_s,s,.42,0)),t.push(En(.34,.48,.58,"#c16649",s+n*1.6,-3.07,1.6),En(.18,.3,.23,$c,s+n*1.6,-2.68,1.6)))}return hi(t)}function um(i){let e=Array.from({length:10},()=>new _t(0,-1e3,0,0));function t(_){_.onBeforeCompile=y=>{y.uniforms.roadCuts={value:e},y.vertexShader=y.vertexShader.replace("#include <common>",`#include <common>
varying vec3 deckPosition;`).replace("#include <begin_vertex>",`#include <begin_vertex>
deckPosition=(modelMatrix*vec4(transformed,1.)).xyz;`),y.fragmentShader=y.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 deckPosition; uniform vec4 roadCuts[10];`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
for(int i=0;i<10;i++){vec4 h=roadCuts[i];if(abs(deckPosition.x-h.x)<h.z && abs(deckPosition.z-h.y)<h.w)discard;}`)}}let n=new Qe(new zt(140,154),new kt({uniforms:{deep:{value:new Ae},crest:{value:new Ae},clock:{value:0},origin:{value:0}},vertexShader:"varying vec3 pos; void main(){vec4 w=modelMatrix*vec4(position,1.);pos=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}",fragmentShader:`varying vec3 pos; uniform vec3 deep,crest;uniform float clock,origin;
      void main(){vec2 q=vec2(pos.x,pos.z-origin);float n=sin(q.y*1.36+sin(q.x*.78+clock*.34)*1.5+clock*.45)+.6*sin(q.x*1.45-q.y*.84-clock*.29);
      float streak=smoothstep(1.36,1.53,n);float light=.10+.13*sin(q.x*.14+q.y*.16)+streak*.33;
      gl_FragColor=vec4(mix(deep,crest,max(0.,light)),1.);
      #include <colorspace_fragment>
      }`}));n.rotation.x=-Math.PI/2,n.position.set(0,-3.7,-43),i.add(n);let s=new Map,r=new Map,a=new Map,o=new We,c,l,h=new nn(.035,.035,1,8),f=new Bt({color:11246457}),u=new N,d=new N,p=new N,x=new N(0,1,0);function m(_){let y=_.kind+":"+(_.length||0)+":"+(_.direction||0);s.has(y)||s.set(y,XM(_.kind,_.length,_.direction));let M=s.get(y),w=new Ct,b=M.base.clone();w.add(b);let v,S,D,I=[];if(M.deck&&(v=M.deck.clone(),v.position.z=-_.length/2,w.add(v)),M.arrows&&(S=M.arrows.clone(),w.add(S)),(_.kind==="cache"||_.kind==="bridge"||_.kind==="coil")&&(D=qM(),w.add(D.mesh),D.mesh.position.set(0,_.kind==="cache"?.66:_.kind==="coil"?.55:.43,_.kind==="bridge"?_.length/2+.48:_.kind==="coil"?.56:.397)),_.kind==="bridge")for(let O=0;O<2;O++){let G=new Qe(h,f);w.add(G),I.push(G)}return i.add(w),{g:w,base:b,leaf:v,arrows:S,chains:I,label:D}}function g(_){let y=_.route.theme;if(y!==c){if(c&&(r.get(c).visible=!1),c=y,!r.has(y)){let b=new hn(YM(y),lm,10);b.frustumCulled=!1,r.set(y,b),i.add(b)}r.get(y).visible=!0,n.material.uniforms.deep.value.set(ar[y].deep),n.material.uniforms.crest.value.set(ar[y].glint)}let M=r.get(y);for(let b=0;b<10;b++)M.setMatrixAt(b,o.makeTranslation(0,0,12-b*10+_.distance%10));if(M.instanceMatrix.needsUpdate=!0,n.material.uniforms.clock.value=_.elapsed,n.material.uniforms.origin.value=_.distance,_.features!==l){for(let b of a.values())b.g.removeFromParent(),b.label?.dispose();a.clear(),l=_.features}let w=0;for(let b of _.features){if(b.z<-68||b.z>14){let S=a.get(b);S&&(S.g.visible=!1);continue}let v=a.get(b)||m(b);if(a.set(b,v),v.g.visible=!0,v.g.position.set(b.x,0,b.z),b.kind==="gap"||b.kind==="bridge"){w<e.length&&e[w++].set(b.x,b.z,4.4/2-.055,b.length/2),v.leaf.visible=b.kind==="bridge"||b.state==="repaired";let S=$e.smoothstep(b.age,0,.58);v.leaf.rotation.x=b.state==="cut"?-.2+1.6*S:b.state==="ready"&&b.kind==="bridge"?-.2:b.state==="linked"?-.2*(1-S):0,b.state==="repaired"&&(v.leaf.position.y=.03+.22*(1-S));for(let D=0;D<v.chains.length;D++){let I=v.chains[D],O=(D?1:-1)*1.83;I.visible=b.state!=="cut"&&b.state!=="repaired",u.set(O,1.63,-b.length/2),d.set(O,-Math.sin(v.leaf.rotation.x)*b.length+.1,-b.length/2+Math.cos(v.leaf.rotation.x)*b.length),p.subVectors(d,u),I.scale.y=p.length(),I.position.copy(u).lerp(d,.5),I.quaternion.setFromUnitVectors(x,p.normalize())}}v.arrows&&(v.arrows.position.x=Math.sin(_.elapsed*5)*.39*b.direction),v.label&&(v.label.mesh.visible=b.state==="ready",v.label.mesh.visible&&v.label.label((b.kind==="bridge"?"\u65AD\u7D22 ":b.kind==="coil"?"\u7535 ":"\u7BB1 ")+Math.ceil(b.hp))),(b.kind==="cache"||b.kind==="coil")&&b.state!=="ready"&&v.base.scale.setScalar(1-$e.smoothstep(b.age,0,.24))}for(let b=w;b<e.length;b++)e[b].set(0,-1e3,0,0)}return{cutDeck:t,update:g}}var Pf=13.2,ta=14,Eo=-110,tr=ta-Eo,ea=(ta+Eo)/2,fm=-.18;function dm(i){let e=ar[i],t=parseInt(e.floor.slice(1),16),n=document.createElement("canvas");n.width=256,n.height=192;let s=n.getContext("2d"),r=s.createImageData(n.width,n.height),a=941;for(let l=0;l<n.height;l++)for(let h=0;h<n.width;h++){a=Math.imul(1664525,a)+1013904223>>>0;let f=(a/4294967296-.5)*3,u=Math.min(h,n.width-1-h),d=f-Math.max(0,1-u/4)*12,p=(l*n.width+h)*4;r.data[p]=(t>>16)+d,r.data[p+1]=(t>>8&255)+d,r.data[p+2]=(t&255)+d,r.data[p+3]=255}s.putImageData(r,0,0),s.fillStyle="rgba(81,74,91,.21)",s.fillRect(0,0,n.width,1.5),s.fillStyle="rgba(244,236,233,.36)",s.fillRect(0,2,n.width,1);for(let l of[7,249])for(let h of[9,183])s.fillStyle="#a59aa4",s.fillRect(l-1,h-1,2.5,2.5);let o=(l,h,f,u,d,p=1)=>{s.strokeStyle=d,s.lineWidth=p,s.beginPath(),s.moveTo(l,h),s.lineTo(f,u),s.stroke()};if(i==="timber")for(let l=0;l<8;l++){let h=l*24;o(0,h,256,h,e.joint,2),o(0,h+2,256,h+2,"#efc398",1);for(let f=0;f<4;f++){let u=(l*41+f*71)%244;s.strokeStyle="rgba(112,69,43,.20)",s.beginPath(),s.moveTo(u,h+12),s.bezierCurveTo(u+13,h+6,u+17,h+15,u+38,h+10),s.stroke()}}else if(i==="forge")for(let l=0;l<3;l++)for(let h=0;h<4;h++){let f=l*85+7,u=h*48+5;s.strokeStyle=e.joint,s.strokeRect(f,u,71,35);for(let d=0;d<4;d++)o(f+7+d*4,u+26,f+12+d*4,u+19,"#82939f")}else if(i==="quarry"||i==="cinder")for(let l=0;l<4;l++){let h=l*48;o(0,h,256,h+1,e.joint,1.5);for(let f=0;f<4;f++){let u=f*76+l%2*32;o(u,h,u+2,h+48,e.joint)}}else if(i==="ice")for(let l=0;l<12;l++){let h=l*63%249,f=l*47%175;o(h,f,h+14,f+13,"#e2f4fa",1.4),o(h+7,f+7,h+17,f+6,"#a0c4d7")}for(let l of[256/3,512/3]){s.fillStyle=e.line,s.fillRect(l-1.7,0,3.4,192),s.fillStyle=e.rim,s.fillRect(l-.25,0,1.2,192);for(let h=7;h<192;h+=48)s.fillRect(l-1.6,h,3,12)}let c=new Gn(n);return c.colorSpace=xt,c.wrapT=mi,c.repeat.y=tr/8,c}function ZM(i,e){let t=new Map,n,s=dm("quay");t.set("quay",s);let r=new Qe(new zt(Pf,tr),new ja({map:s}));r.rotation.x=-Math.PI/2,r.position.set(0,0,ea),r.receiveShadow=!0,i.add(r);let a=[vt(un(Pf+.13,.38,tr),"#535568",0,-.205,ea)];for(let c of[-1,1]){let l=c*Pf/2;a.push(vt(un(.13,.19,tr),"#7c7b8a",l,.018,ea)),a.push(vt(un(.095,.042,tr),"#a6a1af",l+c*.01,.121,ea)),a.push(vt(un(.055,.22,tr),"#444759",l+c*.074,-.14,ea)),a.push(vt(un(.048,.022,tr),"#8b8391",l-c*.085,.006,ea))}let o=new Qe(hi(a),new Bt({vertexColors:!0,shininess:18}));return i.add(o),e.cutDeck(r.material),e.cutDeck(o.material),c=>{let l=c.route.theme;t.has(l)||t.set(l,dm(l)),n!==l&&(r.material.map=t.get(l),n=l),r.material.map.offset.y=c.distance/8%1}}function KM(i){let e=Pn[i].tone==="gold",t=document.createElement("canvas");t.width=e?512:384,t.height=208;let n=t.getContext("2d"),s=t.width,r=t.height,a=n.createLinearGradient(0,0,0,r);a.addColorStop(0,e?"#ffe749":"#40afff"),a.addColorStop(.1,e?"#ffdd22":"#269bfa"),a.addColorStop(.68,e?"#ffd419":"#178cf0"),a.addColorStop(1,e?"#efbb09":"#1276d7"),n.fillStyle=a,n.fillRect(0,0,s,r);let o=Pn[i].label,c=Pn[i].count?147:119;n.font=`900 ${c}px "Arial Rounded MT Bold","Arial Black","PingFang SC","Microsoft YaHei",sans-serif`,n.textAlign="center",n.lineJoin="round",n.lineCap="round";let l=n.measureText(o),h=r/2+(l.actualBoundingBoxAscent-l.actualBoundingBoxDescent)/2;n.translate(s/2,h+1),n.scale(Math.min(1.25,s*(e?.8:.63)/l.width),1),n.lineWidth=e?15:18,n.strokeStyle="#17212b",n.strokeText(o,0,0),n.fillStyle="#ffffff",n.fillText(o,0,0);let f=new Gn(t);return f.colorSpace=xt,f.anisotropy=4,f}function pm(i,e){let t=[],n=[];function s(a,o,c,l,h,f,u,d){let p=c/2,x=[[-p,0],[p,0],[p+h,-l],[-p+h,-l]],m=[[-p+d,-d],[p-d,-d],[p+h-d,-l+d],[-p+h+d,-l+d]],g=[...x,...m],_=[0,0,0,0,f,f,u,u],y=[4,5,6,4,6,7,0,1,5,0,5,4,1,2,6,1,6,5,2,3,7,2,7,6,3,0,4,3,4,7];for(let M of y){let w=g[M];t.push(a+w[0],.008,o+w[1]),n.push(1,1,1,_[M])}}s(0,.1,i*1.01,e*.87,e*.92,.32,.22,.045),s(0,.17,i+.06,.32,.028,.2,.16,.07);let r=new gt;return r.setAttribute("position",new He(t,3)),r.setAttribute("color",new He(n,4)),r}function JM(i,e,t){let n=Pn[e].tone==="gold",s=n?2.65:1.82,r=n?1.03:.91,a=.17,o=n?"#ffd526":"#2095ef",c=n?"#e8aa10":"#1e76ce",l=n?"#ffe663":"#55b4ff",h=[],f=[vt(un(s-.1,r,a,.047),o,0,r/2,0)];for(let w of[-1,1]){let b=w*(s/2-.046);f.push(vt(un(.085,r+.087,.205),l,b,r/2+.021,0)),h.push(vt(un(.16,.115,.33),c,b,.057,.058))}f.push(vt(un(s-.16,.047,.123),l,0,r-.012,-.003));let u=hi(f);u.rotateX(fm),u.translate(0,.059,.015);let d=hi([u,...h]),p=new zt(s-.19,r-.086);p.translate(0,r/2+.007,a/2+.004),p.rotateX(fm),p.translate(0,.059,.015);let x=[d,p,pm(s,r)],m=[new Bt({vertexColors:!0,shininess:52,specular:6511457}),new At({map:KM(e),toneMapped:!1}),t],g=16,_,y=new We;function M(w){if(_)for(let b of _)i.remove(b),b.dispose();g=w,_=x.map((b,v)=>{let S=new hn(b,m[v],g);return S.count=0,S.frustumCulled=!1,v===2&&(S.renderOrder=1),i.add(S),S}),_[0].instanceMatrix.setUsage(Xn);for(let b of _.slice(1))b.instanceMatrix=_[0].instanceMatrix}return M(g),w=>{let b=0;for(let S of w)(S.active||S.pop<.28)&&S.type===e&&S.z>=Eo&&S.z<ta&&b++;b>g&&M($e.ceilPowerOfTwo(b));let v=0;for(let S of w){if(!S.active&&!(S.pop<.28)||S.type!==e||S.z<Eo||S.z>=ta)continue;let D=S.active?0:S.pop/.28,I=(1+.24*Math.sin(Math.PI*D)+S.flash*.065)*(1-D*D);y.makeScale(I,I*(1+.18*Math.sin(D*Math.PI)),I),y.setPosition(S.x+.22*(S.x<0?1:-1)*D,Math.sin(D*Math.PI)*.38,S.z),_[0].setMatrixAt(v++,y)}for(let S of _)S.count=v;_[0].instanceMatrix.needsUpdate=v>0}}var $M=[[[[-.72,1.01],[-1.01,1.09],[-1.19,1.01],[-1.41,1.17]],[[-1.01,1.09],[-.93,1.24],[-1.02,1.39],[-.89,1.56]],[[-1.19,1.01],[-1.32,.86],[-1.51,.81]]],[[[-1.41,1.17],[-1.59,1.12],[-1.74,1.22],[-1.96,1.2]],[[-.72,1.01],[-.83,.82],[-.69,.66],[-.72,.53],[-.51,.31],[-.58,.15]],[[.48,1.18],[.65,1.33],[.82,1.36],[.95,1.56]],[[.65,1.33],[.72,1.08],[.98,.68],[1.19,.63],[1.38,.43]]],[[[.98,.68],[1.21,.88],[1.41,.8],[1.63,.97],[1.9,.9]],[[1.19,.63],[1.1,.42],[1.2,.31],[1.12,.12]],[[-.72,.53],[-1.03,.51],[-1.21,.37],[-1.47,.4]],[[-1.02,1.39],[-1.29,1.42],[-1.46,1.56]]]];function jM(i){let e=[];for(let t of i)for(let n=1;n<t.length;n++){let[s,r]=t[n-1],[a,o]=t[n],c=Math.hypot(a-s,o-r)+.018,l=new $t(0,0,Math.atan2(o-r,a-s)),h=n===1?.039:.031;e.push(vt(new zt(c,h),"#302e39",(s+a)/2,(r+o)/2,.227,l)),e.push(vt(new zt(c,h*.38),"#e3dee1",(s+a)/2,(r+o)/2+h*.41,.229,l))}return hi(e)}function QM(i,e){let t=new Ct;i.add(t);let n=4.28,s=1.65,r=[vt(un(n-.08,s-.08,.39,.057),"#61616d",0,s/2,0)];for(let x of[-1,1]){let m=x*(n/2-.085);r.push(vt(un(.165,s,.47,.038),"#858493",m,s/2,0)),r.push(vt(un(.14,s-.12,.032),"#9998a4",m,s/2,.228));for(let g of[.15,s-.16]){let _=new $t(Math.PI/2,0,0);r.push(vt(new nn(.074,.074,.023,10),"#40414e",m,g,.254,_)),r.push(vt(new nn(.052,.061,.032,6),"#a9a8af",m,g,.273,_))}}for(let x of[.084,s-.079])r.push(vt(un(n-.28,.11,.43,.019),"#898795",0,x,0));let a=document.createElement("canvas");a.width=256,a.height=112;let o=a.getContext("2d"),c=new Gn(a);c.colorSpace=xt;let l=new Qe(new zt(1.8,.79),new At({map:c,transparent:!0,depthWrite:!1,toneMapped:!1}));l.position.set(0,.84,.253),t.add(l);let h,f=new Bt({vertexColors:!0,shininess:36,specular:6841713,emissive:16774637,emissiveIntensity:0});t.add(new Qe(hi(r),f));let u=new Qe(pm(n,s),e);u.renderOrder=1,t.add(u);let d=new At({vertexColors:!0}),p=$M.map(x=>{let m=new Qe(jM(x),d);return t.add(m),m});return x=>{if(t.visible=!!(x&&x.hp>0&&x.z>=Eo&&x.z<ta),!t.visible)return;t.position.set(x.x,0,x.z);let m=Math.ceil(x.hp);m!==h&&(o.clearRect(0,0,a.width,a.height),o.font='900 102px "Arial Black",sans-serif',o.textAlign="center",o.textBaseline="middle",o.lineWidth=9,o.strokeStyle="#333340",o.strokeText(String(m),128,60),o.fillStyle="#f4edf0",o.fillText(String(m),128,60),c.needsUpdate=!0,h=m);let g=x.hp/Math.max(1,x.maxHp);f.emissiveIntensity=Math.sqrt($e.clamp(x.flash||0,0,1))*.35,p[0].visible=g<.93,p[1].visible=g<=.67,p[2].visible=g<=.36}}function mm(i){let e=new Ct;e.name="Course",i.add(e);let t=um(e),n=ZM(e,t),s=new At({color:3158603,vertexColors:!0,transparent:!0,depthWrite:!1,toneMapped:!1}),r=Object.keys(Pn).map(f=>JM(e,f,s)),a=new hn(new Nn(1,.073,.065),new At,80);a.frustumCulled=!1,e.add(a);let o=new We,c=new Ae("#253347"),l=new Ae("#f5fffe"),h=QM(e,s);return{update(f){let{gates:u,wall:d}=f;t.update(f),n(f);for(let x of r)x(u);let p=0;for(let x of u){if(!x.active||x.hp>=x.maxHp||x.z<-45||x.z>ta)continue;let m=Pn[x.type].tone==="gold"?2.22:1.48,g=m*x.hp/x.maxHp;for(let[_,y,M,w]of[[m,x.x,x.z+.18,c],[g,x.x-(m-g)/2,x.z+.22,l]])o.makeScale(_,1,1).setPosition(y,.13,M),a.setMatrixAt(p,o),a.setColorAt(p++,w)}a.count=p,p&&(a.instanceMatrix.needsUpdate=!0,a.instanceColor.needsUpdate=!0),h(d)},dispose(){let f=new Set,u=new Set,d=new Set;e.traverse(p=>{p.isMesh&&(f.add(p.geometry),u.add(p.material),p.material.map&&d.add(p.material.map),p.isInstancedMesh&&p.dispose())}),e.removeFromParent();for(let p of f)p.dispose();for(let p of u)p.dispose();for(let p of d)p.dispose()}}}var eb=new zt(1,1),Lf=new si(1,16,10),wo=i=>new At({color:i,toneMapped:!1}),tb=new Bt({color:4213080,shininess:65}),Nf=wo(16760162),gm=wo(13565951),Df=new N,Kw=new N,nb=new N(0,1,0),Uf=$e.clamp;function ib(){return new kt({uniforms:{ink:{value:new Ae},style:{value:0},time:{value:0},progress:{value:0},after:{value:0}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:"varying vec2 tex;void main(){tex=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 tex;uniform vec3 ink;uniform float style,time,progress,after;
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
    }`})}function wi(i,e,t){let n=new Qe(i,e);return t.add(n),n}function sb(i,e,t,n){Df.subVectors(t,e);let s=Df.length();i.position.copy(e).lerp(t,.5),i.scale.set(n,s,n),i.quaternion.setFromUnitVectors(nb,Df.normalize())}function rb(i){let e=new Ct;i.add(e);let t=ib(),n=wi(eb,t,e);n.renderOrder=3;let s=new Ct;e.add(s);let r=new Bt({color:3330759,emissive:1210479,transparent:!0,opacity:.8,shininess:90});wi(Lf,r,s).scale.set(.42,.28,.45);let a=wi(new ri(.46,.053,6,25,Math.PI*1.65),gm,s);a.rotation.x=-1.2;let o=new Ct;e.add(o),wi(Lf,tb,o).scale.set(.235,.29,.235),wi(new ri(.235,.04,6,20),Nf,o).rotation.x=1.3;let l=wi(Lf,Nf,o);l.position.y=.22,l.scale.setScalar(.12);let h=wi(new nn(1,.2,1,12,1,!0),new At({color:6478335,transparent:!0,opacity:.41,toneMapped:!1,depthWrite:!1,side:Ht}),e),f=new Ct;e.add(f);let u=[wo("#e8beff"),wo("#ab65dd"),wo("#83eaff")];for(let x=0;x<7;x++){let m=wi(new hs(1,1,5),u[x%2],f),g=x*2.4;m.position.set(Math.cos(g)*(.27+x*.05),.4,Math.sin(g)*(.27+x*.05)),m.rotation.set(Math.sin(g)*.32,x*.9,Math.cos(g)*.38),m.scale.set(.13+x%3*.035,.66+x%3*.35,.17)}let d=new Ct;e.add(d);for(let x=0;x<7;x++)wi(new Gs(1),gm,d).scale.set(.055,.09,.28);let p=wi(new ri(1,.09,6,32,Math.PI*1.4),Nf,e);return p.rotation.x=-Math.PI/2,{root:e,mat:t,mark:n,bubble:s,shell:o,beam:h,ridge:f,streaks:d,wave:p}}function xm(i){let e=Array.from({length:3},()=>rb(i)),t=new N,n=new N;return function(r){let a=r.skill;e.forEach((o,c)=>{let l=a?.marks[c];if(o.root.visible=!!l&&!r.defeated,!o.root.visible)return;let h=a.age-l.delay,f=lh(a,l),u=Uf((h-a.warm-a.flight)/.62,0,1),d=h>=a.warm,p=f>=1,x=l.x-a.x,m=l.z-a.z,g=o.mat.uniforms;g.ink.value.set(Tn[a.kind].color);let _=Uf(h/a.warm,0,1);if(g.progress.value=d?f:_,g.after.value=u,g.time.value=a.age,g.style.value=l.shape==="circle"?0:l.shape==="strip"?1:2,o.mark.visible=h>=-.12&&u<1,l.shape==="circle")o.mark.rotation.set(-Math.PI/2,0,0),o.mark.scale.set(2*l.radius,2*l.radius,1),o.mark.position.set(l.x,.059,l.z);else{let b=Math.hypot(x,m),v=Math.atan2(x,m);o.mark.position.set((l.x+a.x)/2+Math.sin(v)*.82,.06,(l.z+a.z)/2+Math.cos(v)*.82),o.mark.rotation.order="YXZ",o.mark.rotation.set(Math.PI/2,v,0),o.mark.material.side=Ht,o.mark.scale.set(2*l.radius,b+1.64,1)}let y=d&&!p;o.bubble.visible=y&&a.kind==="diver",o.shell.visible=y&&a.kind==="engine";let M=o.bubble.visible?o.bubble:o.shell;if(M.visible){let b=a.x+(c?1:-1)*.8,v=a.kind==="engine"?4.6:.57;M.position.set($e.lerp(b,l.x,f),a.height*(1-f)+.17+Math.sin(Math.PI*f)*v,$e.lerp(a.z,l.z,f)),M.rotation.y=f*7}let w=a.kind==="kestrel";if(o.beam.visible=w&&d&&u<.82,o.streaks.visible=o.beam.visible,o.beam.visible){let b=Uf(f*1.25,0,1);t.set(a.x,a.height,a.z+.59),n.set(l.x,.34,l.z).lerp(t,1-b),sb(o.beam,t,n,l.radius*(1-u*.55)),o.beam.material.opacity=(.31+.12*Math.sin(a.age*24))*(1-u),o.streaks.children.forEach((v,S)=>{let D=(a.age*1.9+S*.136)%1;v.position.copy(t).lerp(n,D),v.position.x+=Math.sin(S*1.8+a.age*11)*D*.78,v.position.y+=Math.cos(S*1.4+a.age*12)*D*.26})}o.ridge.visible=a.kind==="drill"&&p&&u<1,o.ridge.visible&&(o.ridge.position.set(l.x,.025,l.z),o.ridge.scale.set(1,Math.max(.02,Math.sin(Math.PI*Math.pow(u,.58))*1.35),1)),o.wave.visible=y&&(a.kind==="bruiser"||a.kind==="warden"),o.wave.visible&&(o.wave.position.set(a.x+x*f,.13,a.z+m*f),o.wave.scale.set(1.1+.37*f,.4+.25*f,1),o.wave.rotation.z=Math.atan2(x,m)-.59)})}}var Ff=128,Of=4,Re={glow:0,smoke:1,glint:2,wave:3,crack:4,plus:5,arrow:6,flash:7,goldWave:8,ember:9};function ab(){let i=document.createElement("canvas");i.width=i.height=Ff*Of;let e=i.getContext("2d");function t(a,o){e.save(),e.translate((a%Of+.5)*Ff,(Math.floor(a/Of)+.5)*Ff),o(),e.restore()}function n(a,o,c,l){let h=e.createRadialGradient(a,o,0,a,o,c);for(let[f,u]of l)h.addColorStop(f,u);e.fillStyle=h,e.fillRect(a-c,o-c,c*2,c*2)}let s="rgba(255,255,255,0)";t(Re.glow,()=>{n(0,0,57,[[0,"#fff"],[.18,"rgba(255,255,255,.94)"],[.43,"rgba(255,255,255,.41)"],[1,s]])}),t(Re.smoke,()=>{let a=[[-14,8,37],[18,8,32],[9,-13,32],[-15,-13,27],[3,3,40]];for(let[o,c,l]of a)n(o,c,l,[[0,"rgba(255,255,255,.62)"],[.38,"rgba(255,255,255,.42)"],[.77,"rgba(255,255,255,.13)"],[1,s]])}),t(Re.glint,()=>{n(0,0,44,[[0,"#fff"],[.16,"rgba(255,255,255,.9)"],[1,s]]),e.fillStyle="#fff",e.beginPath();for(let a=0;a<8;a++){let o=a*Math.PI/4,c=a%2?5:a%4?45:32,l=Math.cos(o)*c,h=Math.sin(o)*c;a===0?e.moveTo(l,h):e.lineTo(l,h)}e.closePath(),e.fill()}),t(Re.wave,()=>{n(0,0,60,[[0,s],[.7,s],[.78,"rgba(255,255,255,.26)"],[.86,"rgba(255,255,255,.94)"],[.9,"rgba(255,255,255,.60)"],[1,s]])}),t(Re.goldWave,()=>{n(0,0,58,[[0,"rgba(255,255,255,.25)"],[.41,"rgba(255,255,255,.08)"],[.66,s],[.81,"rgba(255,255,255,.18)"],[.88,"#fff"],[.92,"rgba(255,255,255,.65)"],[1,s]])}),t(Re.crack,()=>{n(0,0,40,[[0,"#c14d0d"],[.19,"rgba(158,63,22,.9)"],[.62,"rgba(80,52,51,.24)"],[1,"rgba(80,52,51,0)"]]);let a=783,o=()=>(a=a*16807%2147483647,a/2147483647);e.lineCap="round",e.lineJoin="round";for(let c=0;c<11;c++){let l=(c+o()*.55)*2*Math.PI/11,h=31+o()*29,f=0,u=0;for(let d=1;d<=4;d++){let p=l+(o()-.5)*.23,x=h*d/4,m=Math.cos(p)*x,g=Math.sin(p)*x;if(e.beginPath(),e.moveTo(f,u),e.lineTo(m,g),e.lineWidth=(5-d)*.62+.35,e.strokeStyle=d===1?"#793714":"#493e41",e.stroke(),d===2||d===3){let _=p+(o()>.5?.65:-.66);e.beginPath(),e.moveTo(m,g),e.lineTo(m+Math.cos(_)*9,g+Math.sin(_)*9),e.lineWidth=1,e.stroke()}f=m,u=g}}e.beginPath();for(let c=0;c<15;c++){let l=c*Math.PI*2/15,h=5+o()*10,f=Math.cos(l)*h,u=Math.sin(l)*h;c?e.lineTo(f,u):e.moveTo(f,u)}e.closePath(),e.fillStyle="#ff9021",e.fill()}),t(Re.plus,()=>{e.font="1000 80px Arial Black, Arial, sans-serif",e.textAlign="center",e.textBaseline="middle",e.lineJoin="round",e.strokeStyle="#754508",e.lineWidth=9,e.strokeText("+1",0,6,110),e.strokeStyle="#422916",e.lineWidth=6.5,e.strokeText("+1",0,2,110);let a=e.createLinearGradient(0,-28,0,32);a.addColorStop(0,"#fff592"),a.addColorStop(.31,"#fff020"),a.addColorStop(1,"#ffbe00"),e.fillStyle=a,e.fillText("+1",0,2,110)}),t(Re.arrow,()=>{e.shadowColor="#00baff",e.shadowBlur=9,e.beginPath(),e.moveTo(0,-47),e.lineTo(35,-7),e.lineTo(16,-7),e.lineTo(16,40),e.lineTo(-16,40),e.lineTo(-16,-7),e.lineTo(-35,-7),e.closePath();let a=e.createLinearGradient(0,-45,0,40);a.addColorStop(0,"#f2ffff"),a.addColorStop(.45,"#67fff4"),a.addColorStop(1,"rgba(10,201,255,.38)"),e.fillStyle=a,e.fill(),e.shadowBlur=0,e.lineWidth=2,e.strokeStyle="rgba(227,255,255,.82)",e.stroke()}),t(Re.flash,()=>{n(0,0,58,[[0,"#fff"],[.21,"#fff"],[.36,"rgba(255,255,255,.85)"],[.71,"rgba(255,255,255,.18)"],[1,s]]);for(let a=0;a<9;a++){let o=a*Math.PI*2/9+.2,c=a%3===1?48:31;e.save(),e.rotate(o),e.beginPath(),e.moveTo(8,-4.2),e.lineTo(c,0),e.lineTo(8,4.2),e.closePath(),e.fillStyle="rgba(255,255,255,.76)",e.fill(),e.restore()}}),t(Re.ember,()=>{e.save(),e.scale(.45,1),n(0,0,53,[[0,"#fff"],[.37,"#fff"],[.65,"rgba(255,255,255,.58)"],[1,s]]),e.restore()});let r=new Gn(i);return r.colorSpace=xt,r}function ob(i,e){let t=new zt(1,1),n=new ds;n.setIndex(t.index),n.setAttribute("position",t.getAttribute("position")),n.setAttribute("uv",t.getAttribute("uv"));let s={};for(let[c,l]of[["anchor",3],["sizeModeTile",4],["tint",4],["rotation",1]]){let h=new cn(new Float32Array(e*l),l);h.setUsage(Xn),n.setAttribute(c,h),s[c]=h}let r=new kt({uniforms:{atlas:{value:ab()}},transparent:!0,depthWrite:!1,side:Ht,toneMapped:!1,vertexShader:`
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
      }`});r.forceSinglePass=!0;let a=new Qe(n,r);a.frustumCulled=!1,a.renderOrder=8,n.instanceCount=0,i.add(a);let o=0;return{clear(){o=0},write(c,l,h,f,u,d,p,x,m,g=0){o>=e||m<.008||(s.anchor.setXYZ(o,c,l,h),s.sizeModeTile.setXYZW(o,f,u,d?1:0,p),s.tint.setXYZW(o,x.r,x.g,x.b,m),s.rotation.setX(o,g),o++)},flush(){a.visible=o>0,n.instanceCount=o;for(let c of Object.values(s))c.clearUpdateRanges(),o&&c.addUpdateRange(0,o*c.itemSize),c.needsUpdate=!0}}}function Bf(i,e){let t=i.map(([a,o])=>new ae(o,a)),n=new Ja(t,e),s=new Float32Array(n.attributes.position.count*3),r=i.map(([,,a])=>new Ae(a));for(let a=0;a<n.attributes.position.count;a++)r[a%r.length].toArray(s,a*3);return n.setAttribute("color",new Ot(s,3)),n.rotateX(-Math.PI/2),n}function jc(i,e,t,n,s){let r=new hn(e,t,n);return r.instanceMatrix.setUsage(Xn),r.count=0,r.frustumCulled=!1,r.renderOrder=s,i.add(r),r}var Ne=Object.fromEntries(Object.entries({white:"#ffffff",pearl:"#fff5dc",aqua:"#64ffff",blue:"#18ccff",gold:"#ffd02f",orange:"#ff861d",fire:"#ff5a16",violet:"#c181ff",frost:"#a0edff",surf:"#68f4d5",dust:"#ece0cd",smoke:"#928180",steel:"#8f99a3"}).map(([i,e])=>[i,new Ae(e)])),_m=["#555c69","#8e97a3","#abb4bc","#727986","#a5a7aa"].map(i=>new Ae(i)),bt=(i,e)=>i+(e-i)*Math.random(),To=(i,e,t)=>Math.min(t,Math.max(e,i)),Ti=Math.PI*2;function lb(i,e){let t=new zt(1,1,5,1),n=new ds().copy(t),s=new cn(new Float32Array(e*3),3),r=new cn(new Float32Array(e*3),3),a=new cn(new Float32Array(e*4),4);for(let[l,h]of[["trailStart",s],["trailEnd",r],["trailStyle",a]])n.setAttribute(l,h.setUsage(Xn));let o=new kt({transparent:!0,depthWrite:!1,toneMapped:!1,side:Ht,vertexShader:`
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
      }`});o.forceSinglePass=!0;let c=new Qe(n,o);return c.frustumCulled=!1,c.renderOrder=4,n.instanceCount=0,i.add(c),{write(l,h,f,u,d,p,x){s.setXYZ(l,h.x,h.y,h.z),r.setXYZ(l,f.x,f.y,f.z),a.setXYZW(l,u,d,p,x)},flush(l){if(n.instanceCount=l,c.visible=l>0,!!l)for(let h of[s,r,a])h.clearUpdateRanges(),h.addUpdateRange(0,l*h.itemSize),h.needsUpdate=!0}}}function vm(i){let e=ob(i,650),t=jc(i,Bf([[-.33,.004,"#1395ec"],[-.14,.026,"#28d7ff"],[.1,.039,"#b4fbff"],[.24,.025,"#e8ffff"],[.3,.002,"#ebffff"]],7),new At({vertexColors:!0,toneMapped:!1}),320,3),n=jc(i,Bf([[-.38,.003,"#b9430d"],[-.37,.127,"#dd7117"],[-.31,.18,"#ff9c1a"],[-.25,.19,"#ffc32d"],[-.21,.158,"#ef8d18"],[-.15,.166,"#ffb824"],[.23,.175,"#ffce36"],[.37,.16,"#ffcb2c"],[.48,.117,"#ffdb46"],[.54,.059,"#ffdc56"],[.56,.001,"#fff1a3"]],14),new Bt({vertexColors:!0,emissive:3609856,specular:16772528,shininess:62}),24,3),s=jc(i,Bf([[-1.52,.003,"#ef5615"],[-1.18,.07,"#fc641b"],[-.77,.114,"#ff9f13"],[-.49,.149,"#ffe039"],[-.31,.112,"#fff8af"]],10),new At({vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,toneMapped:!1}),24,6),r=jc(i,new ka(1,0),new Bt({color:16777215,specular:5660779,shininess:18}),88,2),a=new Pt,o=[],c=[],l=[],h=[],f=5;function u(P,U,H,L,K,B,R,C={}){if(o.length>=260){if(!C.priority&&P!==Re.plus&&P!==Re.arrow&&P!==Re.crack)return;let Me=o.findIndex(q=>q.tile===Re.smoke||q.tile===Re.glint||q.tile===Re.glow);if(Me<0)return;l.push(o[Me]),o[Me]=o[o.length-1],o.pop()}let $=l.pop()||{};$.tile=P,$.x=U,$.y=H,$.z=L,$.start=K,$.end=B,$.life=R,$.age=0,$.color=C.color||Ne.white,$.alpha=C.alpha??1,$.ratio=C.ratio??1,$.vx=C.vx||0,$.vy=C.vy||0,$.vz=C.vz||0,$.gravity=C.gravity||0,$.angle=C.angle||0,$.spin=C.spin||0,$.flat=C.flat||!1,$.world=C.world??!0,$.hold=C.hold??.12,o.push($)}function d(P,U,H,L,K,B){for(let R=0;R<K;R++){let C=(R+Math.random()*.5)*Ti/K,$=bt(.12,.42)*L,Me=bt(.75,2.15)*L;u(Re.smoke,P+Math.cos(C)*$,U+bt(.02,.14),H+Math.sin(C)*$,bt(.23,.47)*L,bt(.71,1.12)*L,bt(.36,.6),{color:B,alpha:bt(.4,.63),vx:Math.cos(C)*Me,vz:Math.sin(C)*Me,vy:bt(.35,1.05),spin:bt(-1.5,1.5),angle:C})}}function p(P,U,H,L,K){for(let B=0;B<K;B++){let R=(B+Math.random())*Ti/K,C=bt(1.8,4.3)*L;u(Re.ember,P,U,H,bt(.22,.39)*L,.035,bt(.21,.42),{color:B%3?Ne.orange:Ne.pearl,vx:Math.cos(R)*C,vz:Math.sin(R)*C,vy:bt(.8,2.5)*L,gravity:5,angle:R,spin:bt(-2,2),ratio:1.7})}}function x(P,U,H,L,K,B=!1){for(let R=0;R<L&&c.length<r.instanceMatrix.count;R++){let C=h.pop()||{};if(C.x=P+bt(-1.75,1.75)*K,C.y=U+bt(.14,.9),C.z=H+bt(-.24,.3),C.vx=bt(-2.8,2.8),C.vz=bt(-1.8,3.5),C.vy=bt(2.2,5.2),B){let $=(R+Math.random())*Ti/L,Me=bt(2.2,4.4);C.x=P+Math.cos($)*.48,C.z=H+Math.sin($)*.48,C.vx=Math.cos($)*Me,C.vz=Math.sin($)*Me}C.size=bt(.085,.245)*K,C.stretch=bt(.52,1.65),C.rx=bt(-2,2),C.ry=bt(-2,2),C.spin=bt(2,8),C.age=0,C.life=bt(.52,1.04),C.color=_m[R%_m.length],c.push(C)}}let m=new Hs(1,2),g=new kt({uniforms:{age:{value:0}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`varying vec3 orb; varying vec3 eye; varying vec3 n; void main(){
      orb=position;vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);
      eye=normalize(-p.xyz);gl_Position=projectionMatrix*p;}`,fragmentShader:`varying vec3 orb;varying vec3 eye;varying vec3 n;uniform float age;
      void main(){float swirl=sin(orb.y*9.+sin(orb.z*5.+age*8.))*sin(orb.x*6.-age*6.);
        float heat=clamp(max(0.,dot(normalize(n),normalize(eye)))+.13*swirl-age*.7,0.,1.);
        vec3 fire=mix(vec3(.94,.16,.026),vec3(1.,.80,.20),smoothstep(.12,.53,heat));
        fire=mix(fire,vec3(1.,.98,.77),smoothstep(.55,.86,heat));
        gl_FragColor=vec4(fire,1.-smoothstep(.52,1.,age));}`}),_=new Ct,y=[[0,.2,0,1.02],[-.62,.06,.08,.65],[.55,.14,-.2,.74],[-.16,.57,-.13,.64],[.33,.36,.36,.48]];for(let[P,U,H,L]of y){let K=new Qe(m,g);K.position.set(P,U,H),K.scale.setScalar(L),K.renderOrder=3,_.add(K)}_.visible=!1,i.add(_);let M=1;function w(P,U,H,L,K=1){let B=To(K,.62,2.05);switch(P){case"cardHit":u(Re.glint,U,H,L+.1,.35,.7,.12,{color:Ne.pearl}),p(U,H,L,.45,3);return;case"supplyBreak":u(Re.flash,U,H,L,.46,1.45,.13,{color:Ne.pearl}),u(Re.wave,U,.07,L,.4,2.45,.32,{flat:!0,color:Ne.aqua}),p(U,H,L,.86,10);return;case"shieldHit":u(Re.wave,U,.1,L,.4,1.75,.26,{flat:!0,color:Ne.aqua}),u(Re.glint,U,H,L,.26,.68,.14,{color:Ne.pearl});return;case"hostileMuzzle":u(Re.flash,U,H,L,.32,.63,.14,{color:Ne.orange});return;case"bruiserCast":case"wardenCast":for(let R of[-1,1])d(U+R*.6,.16,L,1,4,Ne.dust);return;case"diverCast":for(let R of[-1,1])u(Re.wave,U+R*.95,H,L,.32,1.45,.32,{color:Ne.surf});return;case"drillCast":d(U,.2,L,1.21,7,Ne.violet);return;case"kestrelCast":u(Re.glow,U,H,L+.43,.32,1.37,.36,{color:Ne.frost});return;case"engineCast":for(let R of[-1,1])u(Re.flash,U+R*.72,H+.32,L-.2,.4,1.12,.17,{color:Ne.orange});return;case"bruiserStrike":case"wardenStrike":u(Re.crack,U,.043,L,1.4,2.55,.77,{flat:!0,hold:.31}),d(U,.16,L,1.18,8,Ne.dust),x(U,.12,L,7,.55,!0);return;case"diverStrike":u(Re.wave,U,.09,L,.31,2.29,.46,{flat:!0,color:Ne.surf});for(let R=0;R<9;R++){let C=R*Ti/9;u(Re.glow,U,.22,L,.18,.06,.43,{color:Ne.aqua,vx:Math.cos(C)*2.1,vz:Math.sin(C)*2.1,vy:1.5,gravity:3.6})}return;case"drillStrike":d(U,.17,L,.77,5,Ne.violet),u(Re.glint,U,.35,L,.26,1,.19,{color:Ne.violet});return;case"kestrelStrike":u(Re.wave,U,.08,L,.35,2.78,.54,{flat:!0,color:Ne.frost}),d(U,.28,L,.98,7,Ne.frost);return;case"engineStrike":u(Re.flash,U,.45,L,.82,2.2,.19,{color:Ne.orange,priority:!0}),u(Re.wave,U,.07,L,.34,2.63,.37,{flat:!0,color:Ne.gold}),d(U,.2,L,1.1,8,Ne.smoke),p(U,.3,L,1.08,12);return;case"finisher":p(U,H,L,1.35,16),u(Re.flash,U,H,L,.65,1.45,.13,{color:Ne.pearl});return;case"hit":if(f<1)return;f--,p(U,H,L,.48,3),u(Re.glint,U,H,L,.26,.47,.105,{color:Ne.aqua,angle:bt(0,Ti)});return;case"muzzle":u(Re.flash,U,H,L,.47*B,.83*B,.105,{color:Ne.pearl,angle:bt(0,Ti),world:!1}),u(Re.glow,U,H,L,.82*B,.38*B,.13,{color:Ne.orange,alpha:.7,world:!1});return;case"impact":case"slam":{let R=P==="slam",C=B*(R?1.4:1),$=R?.16:Math.max(.17,H*.58);if(R){x(U,.04,L,12,.61,!0);for(let Me of[-1,1])u(Re.flash,U+Me*.57,.12,L,.58,.93,.1,{color:Ne.pearl})}u(Re.crack,U,.035,L,2.02*C,2.33*C,R?2:1.42,{flat:!0,angle:bt(0,Ti),hold:.62}),u(Re.wave,U,.065,L,.42*C,R?2*2.15/.81:3.16*C,.32,{flat:!0,color:R?Ne.gold:Ne.pearl,alpha:.83}),u(Re.flash,U,$,L,.6*C,1.85*C,.16,{color:Ne.gold,angle:bt(0,Ti)}),u(Re.glow,U,$+.06,L,.39*C,.93*C,.1,{color:Ne.pearl}),d(U,.17,L,C,R?12:7,R?Ne.dust:Ne.smoke),p(U,$,L,C,R?10:5);return}case"wallHit":u(Re.flash,U,Math.max(H,.4),L+.12,.38*B,1.12*B,.13,{color:Ne.pearl}),d(U,Math.max(.35,H),L,.61*B,3,Ne.steel),p(U,Math.max(.4,H),L,.59*B,3);return;case"wallBreak":x(U,.24,L,22,Math.min(1.17,B)),u(Re.flash,U,.72,L,.85*B,2.8*B,.19,{color:Ne.pearl}),u(Re.wave,U,.062,L,.6,4.7,.38,{flat:!0,color:Ne.dust});for(let R=-1;R<=1;R++)d(U+R*1.17,.3,L,.98,4,Ne.steel);p(U,.8,L,B,7);return;case"plus":{u(Re.wave,U,.09,L,.12,1.28,.23,{flat:!0,color:Ne.aqua});let R=Math.max(0,H);u(Re.goldWave,U,.055,L,.22,.96,.34,{flat:!0,world:!1,color:Ne.gold}),u(Re.glow,U,R+.36,L,.45,.82,.28,{ratio:1.75,world:!1,color:Ne.gold}),u(Re.glint,U+.08,R+.57,L,.35,.14,.23,{world:!1,color:Ne.pearl}),u(Re.plus,U+bt(-.13,.13),R+.83,L,.8,1.04,.65,{world:!1,vy:1.1,hold:.62});return}case"merge":{u(Re.goldWave,U,.12,L,2.15,.32,.27,{flat:!0,color:Ne.gold});let R=To(B*1.55,1.5,2.5);u(Re.goldWave,U,.061,L,.38,R,.46,{flat:!0,world:!1,color:Ne.aqua,hold:.3}),u(Re.goldWave,U,.077,L,.17,R*.72,.38,{flat:!0,world:!1,color:Ne.gold}),u(Re.glow,U,H+.62,L,.77*B,1.6*B,.32,{color:Ne.gold,world:!1,ratio:1.3,alpha:.72});for(let C=0;C<3;C++){let $=(C+.16)*Ti/3;u(Re.arrow,U+Math.cos($)*R*.31,H+.3,L+Math.sin($)*R*.34,.38,.65,.51+C*.035,{color:Ne.white,hold:.42,vy:1.55+.15*C,world:!1})}return}case"victory":case"vaultLand":u(Re.wave,U,.06,L,.55,P==="victory"?3.9:2.7,.33,{flat:!0,color:Ne.dust,alpha:.7});for(let R of[-1,1])d(U+R*.63,.12,L,.88,4,Ne.dust);return;case"bossBurst":M=0,_.position.set(U,.8,L),_.visible=!0,u(Re.goldWave,U,.08,L,.6,5.55,.48,{flat:!0,color:Ne.gold,priority:!0});for(let[R,C,$]of[[0,0,2.85],[-.58,.23,1.65],[.67,-.2,1.9]])u(Re.glow,U+R,H+.19,L+C,$*.54,$*1.13,.34,{color:Ne.orange,vy:.83,priority:!0}),u(Re.flash,U+R,H+.22,L+C,$*.31,$,.22,{color:Ne.gold,angle:R*2.4,vy:.9,priority:!0});u(Re.glint,U,H+.35,L,.8,2.65,.13,{color:Ne.pearl,priority:!0}),x(U,.42,L,17,.91,!0),p(U,H+.38,L,1.57,24),d(U,.35,L,1.5,10,Ne.smoke);return;case"chainSnap":for(let R of[-1,1])p(U+R*1.86,1.04,L,1.15,9);u(Re.flash,U,H,L,.38,1.4,.15,{color:Ne.pearl});return;case"discharge":u(Re.wave,U,.1,L,.45,8.5,.35,{flat:!0,color:Ne.aqua}),u(Re.flash,U,H+.45,L,.63,3.4,.23,{color:Ne.aqua});for(let R=0;R<7;R++){let C=R*Ti/7;u(Re.glint,U+Math.cos(C)*1.46,.5,L+Math.sin(C)*1.46,.25,1.03,.26,{color:Ne.pearl,angle:C})}return}}let b=new N(0,0,-1),v=new N,S=new N,D=new N,I=lb(i,384);function O(P,U){let H=0,L=0,K=0;for(let B of P){let R=B.kind==="rocket",C=B.profile===Ts,$=B.profile===Po||C,Me=Math.max(0,B.distance-B.profile.tail+B.afterHit*B.profile.speed);if(rr(B,Me,S),B.distance-Me>.012&&K<384){rr(B,(Me+B.distance)*.5,D);let q=D.y-(S.y+B.y)*.5,le=B.range>4?To((B.range-Me)/1.6,0,1):1;I.write(K++,S,B,q,R?.093:C?.092:$?.066:.052,R?2:$?1:0,le*.91)}if(!B.finished){if(rr(B,B.distance+.015,D),v.set(D.x-B.x,D.y-B.y,D.z-B.z).normalize(),a.quaternion.setFromUnitVectors(b,v),a.position.set(B.x,B.y,B.z),!R&&H<t.instanceMatrix.count)a.scale.set($?1.54:1.13,$?1.54:1.13,$?.62:.83),a.updateMatrix(),t.setMatrixAt(H++,a.matrix),B.age<.045&&e.write(B.startX,B.startY,B.startZ,.21,.21,!1,Re.flash,Ne.aqua,.65*(1-B.age/.045));else if(R&&L<n.instanceMatrix.count){let q=.63+Math.min(.19,B.power*.055);a.scale.setScalar(q),a.updateMatrix(),n.setMatrixAt(L,a.matrix),a.scale.z*=.9,a.updateMatrix(),s.setMatrixAt(L++,a.matrix),U>0&&Math.floor(B.age*16)!==Math.floor(Math.max(0,B.age-U)*16)&&u(Re.smoke,S.x,S.y,S.z,.14*q,.39*q,.19,{color:Ne.dust,alpha:.38,vy:.19,world:!1})}}}I.flush(K),t.count=H,n.count=s.count=L,t.visible=H>0,n.visible=s.visible=L>0,H&&(t.instanceMatrix.needsUpdate=!0),L&&(n.instanceMatrix.needsUpdate=!0,s.instanceMatrix.needsUpdate=!0)}function G(P,U,H,L=[]){if(_.visible){M+=P;let R=Math.min(1,M/.44);_.position.z+=U,_.position.y+=.74*P,_.scale.setScalar(.28+.94*Math.sin(Math.PI*Math.sqrt(R))),g.uniforms.age.value=R,R>=1&&(_.visible=!1)}let K=To(P,0,.12);f=Math.min(6,f+K*21),e.clear(),O(H,K);for(let R of L)e.write(R.x-R.vx*.038,R.y,R.z-R.vz*.038,.3,.52,!1,Re.glow,Ne.fire,.8),e.write(R.x,R.y,R.z,.3,.34,!1,Re.glint,Ne.gold,.98);for(let R=o.length-1;R>=0;R--){let C=o[R];if(C.age+=K,C.age>=C.life){l.push(C),o[R]=o[o.length-1],o.pop();continue}C.x+=C.vx*K,C.y+=C.vy*K,C.z+=C.vz*K+(C.world?U:0),C.vy-=C.gravity*K,C.angle+=C.spin*K}for(let R=0;R<2;R++)for(let C of o){if((C.tile===Re.plus||C.tile===Re.arrow)!==(R===1))continue;let Me=C.age/C.life,q=1-(1-Me)*(1-Me),le=$e.lerp(C.start,C.end,q),Ee=1-To((Me-C.hold)/(1-C.hold),0,1);e.write(C.x,C.y,C.z,le,le*C.ratio,C.flat,C.tile,C.color,C.alpha*Ee,C.angle)}e.flush();let B=0;for(let R=c.length-1;R>=0;R--){let C=c[R];if(C.age+=K,C.age>=C.life){h.push(C),c[R]=c[c.length-1],c.pop();continue}C.x+=C.vx*K,C.z+=C.vz*K+U,C.y+=C.vy*K,C.vy-=11*K,C.y<C.size*.4&&(C.y=C.size*.4,C.vy=Math.abs(C.vy)*.22,C.vx*=.78,C.vz*=.78);let $=Math.min(1,(C.life-C.age)*5);a.position.set(C.x,C.y,C.z),a.rotation.set(C.rx+C.age*C.spin,C.ry-C.age*C.spin*.56,C.age*C.spin*.77),a.scale.set(C.size*C.stretch*$,C.size*.74*$,C.size*$),a.updateMatrix(),r.setMatrixAt(B,a.matrix),r.setColorAt(B++,C.color)}r.count=B,r.visible=B>0,B&&(r.instanceMatrix.needsUpdate=!0,r.instanceColor.needsUpdate=!0)}function Y(){_.visible=!1,l.push(...o),h.push(...c),o.length=c.length=0,f=5,I.flush(0);for(let P of[t,n,s,r])P.count=0,P.visible=!1;e.clear(),e.flush()}return Y(),{update:G,burst:w,reset:Y}}var ym={ally:{width:.467,height:.86,pivot:.49,pad:.008,capacity:180,grid:[6,8]},captain:{width:1.13,height:1.73,pivot:.43,pad:.009,capacity:1,grid:[13,16]},grunt:{width:.522,height:.86,pivot:.5,pad:.011,capacity:1800,grid:[6,8]}},Qc=$e.clamp,na=$e.smoothstep,cb=`
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
    float depthSwing = (boots*${Hc/.86}-arms*.16)*swing*dimensions.y;
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
`,hb=`
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
`;function ub(i,e,t,n,s){let r=ym[e],a=new Float32Array(3),o=new zt(1,1,...r.grid),c=new ds().copy(o),l={};for(let[d,p]of[["anchor",3],["dimensions",2],["motion",4],["feet",3],["fallAngle",1],["treatment",4]]){let x=new cn(new Float32Array(r.capacity*p),p);x.setUsage(Xn),l[d]=x,c.setAttribute(d,x)}c.instanceCount=0,t.colorSpace=xt,t.magFilter=qt,t.minFilter=Un,t.generateMipmaps=!0;let h=new kt({uniforms:{portrait:{value:t},cameraRight:{value:n},cameraLift:{value:s},pivot:{value:r.pivot},padding:{value:r.pad}},defines:e==="captain"?{CAPTAIN:1}:e==="ally"?{ALLY:1}:{},vertexShader:cb,fragmentShader:hb,depthWrite:!0,transparent:!1,toneMapped:!1,alphaToCoverage:!0}),f=new Qe(c,h);f.name=`AI ${e}`,f.visible=!1,f.frustumCulled=!1,i.add(f);let u=0;return{begin(){u=0},clear(){u=0,c.instanceCount=0,f.visible=!1},add(d,p,x,m,g,_,y,M=0,w=0,b=0,v=0,S=0,D=0,I=0){u>=r.capacity||m<=.001||g<=.001||(l.fallAngle.setX(u,I),l.anchor.setXYZ(u,d,p,x),l.dimensions.setXY(u,r.width*m,r.height*g),l.motion.setXYZW(u,_,y,M,w),$r(_,y,a),l.feet.setXYZ(u,a[0],a[1],a[2]),l.treatment.setXYZW(u,b,v,S,D),u++)},flush(){if(c.instanceCount=u,f.visible=u>0,!!u)for(let d of Object.values(l))d.clearUpdateRanges(),d.addUpdateRange(0,u*d.itemSize),d.needsUpdate=!0}}}async function Mm(i){let e=new Wi,t=Object.keys(ym),n=await Promise.allSettled(t.map(u=>e.loadAsync(`./art/${u}-field.webp`))),s=n.find(u=>u.status==="rejected");if(s){for(let u of n)u.status==="fulfilled"&&u.value.dispose();throw new Error("\u89D2\u8272\u63D2\u753B\u52A0\u8F7D\u5931\u8D25",{cause:s.reason})}let r=new N,a=new N,o=new N,c=Object.fromEntries(t.map((u,d)=>[u,ub(i,u,n[d].value,r,a)])),l=Object.values(c),h=()=>l.forEach(u=>u.clear());function f(u,d,p,x){if(x!=="ai"&&x!=="hybrid"){h();return}for(let y of l)y.begin();d.updateWorldMatrix(!0,!1),r.setFromMatrixColumn(d.matrixWorld,0),r.y=0,r.normalize(),o.setFromMatrixColumn(d.matrixWorld,1),a.set(0,1,0).lerp(o,.42).normalize();let m=x==="ai",g=u.phase==="ready"?.3:u.playing||u.overrun?1:0,_=p*10.8;if(m)for(let y of u.columns)for(let M of y.units)M.alive&&c.grunt.add(M.x,M.lift||0,M.z,M.size,M.size,jr(M),g);for(let y of u.runners)y.alive&&c.grunt.add(y.x,y.lift||0,y.z,y.size,y.size,jr(y),g);for(let y of u.allies){let M=Qc(y.age/.32,0,1),w=.81+.19*M+.095*Math.sin(M*Math.PI);c.ally.add(y.x,.035*Math.sin(M*Math.PI),y.z,w,w,_+y.phase,g,0,0,.8*(1-M),.22*(1-M))}for(let y of u.deliveries){if(y.slot==null||y.age<0)continue;let M=.65+.35*y.progress;c.ally.add(y.x,y.y,y.z,M,M,_+y.phase,.55,0,0,.42,.24)}{for(let y of u.falling){if(!m&&!(y.side==="blue"&&y.prone))continue;if(y.prone){let S=na(y.t,0,.42),D=y.size*(u.overrun?1:1-na(y.t,1.78,2.1));c.ally.add(y.x,.09*S,y.z,D,D,0,0,.1*S*y.dir,0,0,0,.3*S,0,1.5*S);continue}let M=Qc(y.t/1.02,0,1),w=y.size*(1-na(M,.78,1)),b=y.roll*y.t+.16*Math.sin(y.spin*y.t);(y.side==="red"?c.grunt:c.ally).add(y.x,y.y,y.z,w,w,_+y.phase,0,b,0,0,.64*(1-na(M,.04,.31)),.72*na(M,.05,.31))}if(m&&(u.phase!=="lost"||u.overrun||u.endTime<.25)){let y=u.visualScale,M=u.overrun?na(u.endTime,0,.5):0,w=u.phase==="lost"&&!u.overrun?Qc(u.endTime/.25,0,1):0;c.captain.add(u.x,u.rope?.68*Math.sin(Math.PI*u.rope.age/.58):.1*M,u.captainZ,y,y*(1-.55*w),_*.83,u.overrun?0:g,-.38*w-.12*M,u.recoil,.66*u.mergeGlow,.14*u.mergeGlow+.48*u.hurt+.32*w,0,Qc(u.velocity*.007,-.095,.095),1.5*M)}}for(let y of l)y.flush()}return{draw:f,clear:h,gruntTexture:n[t.indexOf("grunt")].value,allyTexture:n[t.indexOf("ally")].value}}var jt=new Pt;function fb(){let i=[],e=[],t=[];for(let s=0;s<=5;s++){let r=s/5,a=.081+.089*Math.sin(Math.PI*r*.73),o=.407+.182*r;for(let c=0;c<=8;c++){let l=c/4-1;if(i.push(l*a,o+.016*l*l*(1-r),.205+.038*Math.sin(r*Math.PI)-l*l*.07),e.push(.5+l*(.098+.109*Math.sin(Math.PI*r*.73)),1-(.422-r*.16)),s&&c){let h=s*9+c;t.push(h-10,h-9,h,h-10,h,h-1)}}}let n=new gt;return n.setAttribute("position",new He(i,3)),n.setAttribute("uv",new He(e,2)),n.setIndex(t),n}function zf(i,e,t,n){let s=new Float32Array(3),r=O0(e,t),a=new cn(new Float32Array(n*4),4).setUsage(Xn);r.setAttribute("stepPose",a);let o=new Bt({vertexColors:!0,shininess:37,specular:3225412}),c={value:null};o.customProgramCacheKey=()=>"infantry-walk-"+e,o.onBeforeCompile=u=>{u.uniforms.clothingMap=c,u.vertexShader=u.vertexShader.replace("#include <common>",`#include <common>
        varying vec3 kitPosition;
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
        vGlow = stepPose.x; kitPosition = position;
        float arm = step(1.5,abs(limb));
        float leg = step(.5,abs(limb))*(1.0-arm);
        float stride = limb<0.0 ? stepPose.z : stepPose.y;
        float lift = max(0.0,sign(limb)*stepPose.w);
        float pivot = mix(.29,.438,arm);
        transformed.yz = jointTurn * (position.yz-vec2(pivot,0.0))+vec2(pivot,0.0);
        float boot = leg*(1.0-smoothstep(.105,.28,position.y));
        vec2 sole = position.yz + vec2(.118*lift,facing*${Hc}*stride);
        transformed.yz = mix(transformed.yz,sole,boot);
        transformed.y += .022*abs(stepPose.w)*(1.0-boot);
        transformed.x += stepPose.y*.018*position.y + sign(limb)*arm*.009*stride;`),u.fragmentShader=u.fragmentShader.replace("#include <common>",`#include <common>
varying float vGlow; varying vec3 kitPosition; uniform sampler2D clothingMap;`).replace("#include <color_fragment>",`#include <color_fragment>
      float front=smoothstep(.035,.10,kitPosition.z);
      float cloth=front*smoothstep(.21,.26,kitPosition.y)*(1.-smoothstep(.435,.49,kitPosition.y));
      vec2 fabricUV=vec2(.50+kitPosition.x*1.77,kitPosition.y*1.27);
      vec4 fabric=texture2D(clothingMap,fabricUV);
      diffuseColor.rgb=mix(diffuseColor.rgb,fabric.rgb,cloth*fabric.a*.67);
      if (vGlow <= -1.0) {
        vec3 faded = mix(diffuseColor.rgb,vec3(dot(diffuseColor.rgb,vec3(.30,.59,.11))),.34)*.74;
        diffuseColor.rgb = mix(faded,vec3(1.,.85,.64),clamp(-vGlow-1.,0.,1.)*.64);
      }
      diffuseColor.rgb=mix(diffuseColor.rgb, vec3(1.0,.72,.18), clamp(vGlow,0.0,1.0)*.94);`)};let l=new hn(r,o,n),h;l.count=0,l.frustumCulled=!1,l.instanceMatrix.setUsage(Xn),i.add(l);let f=0;return{paint(u){if(c.value=u,e!=="red")return;let d=fb();d.setAttribute("stepPose",a);let p=new At({map:u,toneMapped:!1});p.onBeforeCompile=x=>{x.vertexShader=x.vertexShader.replace("#include <common>",`#include <common>
attribute vec4 stepPose; varying float faceGlow;`).replace("#include <begin_vertex>",`#include <begin_vertex>
faceGlow=stepPose.x; transformed.y+=.022*abs(stepPose.w); transformed.x+=stepPose.y*.018*position.y;`),x.fragmentShader=x.fragmentShader.replace("#include <common>",`#include <common>
varying float faceGlow;`).replace("#include <color_fragment>",`#include <color_fragment>
if(faceGlow<=-1.) diffuseColor.rgb=mix(diffuseColor.rgb*.75,vec3(1.,.85,.64),clamp(-faceGlow-1.,0.,1.)*.64);`)},h=new hn(d,p,n),h.instanceMatrix=l.instanceMatrix,h.frustumCulled=!1,i.add(h)},begin(){f=0},put(u,d,p,x,m=0,g=0,_=0,y=0,M=0,w=0){f>=n||(jt.position.set(u,d,p),jt.rotation.set(g,_,y),jt.scale.setScalar(x),jt.updateMatrix(),l.setMatrixAt(f,jt.matrix),$r(M,w,s),a.setXYZW(f,m,s[0],s[1],s[2]),f++)},end(){l.count=f,l.visible=f>0,h&&(h.count=f,h.visible=l.visible),l.instanceMatrix.needsUpdate=!0,a.needsUpdate=!0}}}function db(i){let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),n=t.createRadialGradient(30,33,1,32,32,31);n.addColorStop(0,"rgba(22,23,45,.63)"),n.addColorStop(.5,"rgba(24,27,49,.47)"),n.addColorStop(.83,"rgba(32,32,53,.20)"),n.addColorStop(1,"rgba(32,32,53,0)"),t.fillStyle=n,t.fillRect(0,0,64,64);let s=new Gn(e);s.colorSpace=xt;let r=new zt(1,1);r.rotateX(-Math.PI/2);let a=new hn(r,new At({map:s,transparent:!0,depthWrite:!1,toneMapped:!1}),1600);a.frustumCulled=!1,a.instanceMatrix.setUsage(Xn),a.renderOrder=1,i.add(a);let o=0;return{begin(){o=0},put(c,l,h,f=1){o>=1600||(jt.position.set(c+h*.3,.021,l-h*.2),jt.rotation.set(0,.65,0),jt.scale.set(h*1.4,.95,h*.79*f),jt.updateMatrix(),a.setMatrixAt(o++,jt.matrix))},end(){a.count=o,a.instanceMatrix.needsUpdate=!0}}}function eh(i,e,t,n,s){let r=new $a(e,i,64);r.rotateX(-Math.PI/2);let a=new Qe(r,new At({color:t,transparent:!0,opacity:n,depthWrite:!1,toneMapped:!1}));return a.renderOrder=3,s.add(a),a}function bm(i,e){let t=new Bc({canvas:i,antialias:!0,alpha:!0,powerPreference:"high-performance"});t.setClearColor(599616,0),t.outputColorSpace=xt;let n=new Ca;n.add(new to(16054527,8753847,1.55));let s=new fs(16772828,2);s.position.set(-8,16,6),n.add(s);let r=new fs(12839167,.63);r.position.set(7,8,-8),n.add(r);let a=new Qt(41,1,.15,150),o=new N,c=z0();n.add(c.root);let l=eh(2.15,2.15-.055,16748086,.82,n),h=eh(2.15,2.15-.115,16761949,.38,n),f,u=om().then(R=>{f=R,n.add(R.root)}),d=zf(n,"blue","near",180),p=zf(n,"red","near",900),x=zf(n,"red","far",1200),m=db(n),g=eh(.68,.634,6618933,.94,n),_=eh(.72,.606,6749239,.21,n),y=new Qe(new si(1,28,12,0,Math.PI*2,0,Math.PI/2),new kt({transparent:!0,depthWrite:!1,vertexShader:"varying vec3 n; varying vec3 eye; void main(){vec4 p=modelViewMatrix*vec4(position,1.); n=normalize(normalMatrix*normal);eye=-p.xyz;gl_Position=projectionMatrix*p;}",fragmentShader:"varying vec3 n; varying vec3 eye; void main(){float rim=pow(1.-abs(dot(normalize(n),normalize(eye))),2.1);gl_FragColor=vec4(.27,.86,1.,.024+.41*rim);}"}));n.add(y);let M=new hn(new Gs(.18),new Bt({color:7133695,emissive:1530771}),20);M.frustumCulled=!1,n.add(M);let w={},b=new Bt({vertexColors:!0});for(let R of["gunner","guard","bomber","standard","vault","courier"]){let C=new hn(B0(R),b,32);C.frustumCulled=!1,n.add(C),w[R]=C}let v=xm(n),S=mm(n),D=vm(n),I=null,O=Mm(n).then(R=>(I=R,d.paint(R.allyTexture),p.paint(R.gruntTexture),x.paint(R.gruntTexture),!0)).catch(R=>(console.warn("\u89D2\u8272\u8D34\u56FE\u52A0\u8F7D\u5931\u8D25\uFF0C\u5DF2\u4F7F\u7528 3D \u6A21\u578B",R),!1)),G=Promise.all([u,O]).then(([,R])=>R),Y=-3.72,P=0,U=1,H=1,L=Math.min(devicePixelRatio||1,1.65),K=()=>{U=e.clientWidth,H=e.clientHeight,a.aspect=U/Math.max(1,H),a.fov=$e.clamp(41+(.54-a.aspect)*27,37,47),a.updateProjectionMatrix(),t.setPixelRatio(L),t.setSize(U,H,!1)};K();function B(R,C,$,Me,q){I||(q="3d");let le=R.playing,Ee=q!=="ai",Be=1-Math.exp(-8.5*$),ce=R.boss.defeatAge,Ie=R.boss.defeated?.18*$e.smoothstep(ce,0,.42)*(1-$e.smoothstep(ce,.82,1.65)):0,dt=19.5*Math.tan($e.degToRad(a.fov/2))*a.aspect,Pe=Math.sign(R.x)*Math.max(0,Math.abs(R.x)-dt*.54),je=$e.lerp(Pe,R.boss.x,Ie),et=(R.boss.z+5.4)*Ie;Y+=(je-Y)*Be,P=Math.max(0,P-$*1.75);let te=Math.sin(C*58)*P*P*.19,re=Math.sin(C*72)*P*P*.12;a.position.set(Y+te,15+re-Ie*1.2,13.2+et),a.lookAt(Y+.06+te,.12,-7.45+et),a.updateMatrixWorld();let se=le||R.overrun?1:0,we=C*10.8;S.update(R),m.begin(),d.begin(),p.begin(),x.begin();for(let T of R.columns)for(let E of T.units)!E.alive||E.z<-61||(Ee&&(E.z<-18?x:p).put(E.x,E.lift||0,E.z,E.size,0,0,E.yaw,0,jr(E),se),E.z>=-32&&m.put(E.x,E.z,.64));for(let T of Object.values(w))T.count=0;for(let T of R.runners){if(!T.alive)continue;let E=w[T.role];E&&E.count<E.instanceMatrix.count&&(jt.position.set(T.x,(T.lift||0)+.012,T.z),jt.rotation.set(0,T.yaw,0),jt.scale.setScalar(T.size),jt.updateMatrix(),E.setMatrixAt(E.count++,jt.matrix)),q==="3d"&&p.put(T.x,T.lift||0,T.z,T.size,0,0,T.yaw,0,jr(T),se),m.put(T.x,T.z,.67)}for(let T of Object.values(w))T.instanceMatrix.needsUpdate=T.count>0;for(let T of R.allies){let E=1;T.age<.25&&(E=.55+.45*Math.min(1,T.age/.15)+Math.sin(Math.PI*Math.min(1,T.age/.25))*.18),q==="3d"&&d.put(T.x,0,T.z,E,Math.max(0,1-T.age*2.8),0,-R.velocity*.014,0,we+T.phase,se),m.put(T.x,T.z,.71*E)}let ue=0;function Xe(T,E,V,ie){ue>=M.instanceMatrix.count||(jt.position.set(T,E,V),jt.rotation.set(.18,C*4,0),jt.scale.setScalar(ie),jt.updateMatrix(),M.setMatrixAt(ue++,jt.matrix))}for(let T of R.deliveries)T.age<0||(T.slot==null?Xe(T.x,T.y+.14,T.z,1.5):q==="3d"&&d.put(T.x,T.y,T.z,.65+.35*T.progress,.42,0,0,0,we+T.phase,.55));if(R.buffs.drone>0)for(let T of[-1,1])Xe(R.x+T*1.15,1.3+.06*Math.sin(C*6),R.captainZ-.32,1);M.count=ue,M.instanceMatrix.needsUpdate=ue>0,y.visible=le&&R.buffs.shield>0,y.visible&&(y.position.set(R.x,.06,R.captainZ),y.scale.set(1.52*R.scale,1.55,1.28*R.scale));for(let T of R.falling){let E=$e.smoothstep(T.t,0,.42),V=(T.size||1)*(T.prone?R.overrun?1:1-$e.smoothstep(T.t,1.78,2.1):1-Math.pow(Math.min(1,T.t/1.02),4));Ee&&!(q==="hybrid"&&T.side==="blue"&&T.prone)&&(T.side==="red"?p:d).put(T.x,T.prone?.15*E:T.y,T.z,V,-2+$e.smoothstep(T.t,.018,.15),T.prone?1.48*E:T.spin*T.t,T.prone?.12*T.dir:T.phase,T.prone?.16*E*T.dir:T.roll*T.t),T.y<2&&m.put(T.x,T.z,.64*V)}let Ce=R.phase==="lost",nt=R.visualScale,it=R.overrun?$e.smoothstep(R.endTime,0,.5):0,ct=Ce&&!R.overrun;c.root.visible=Ee&&(!ct||R.endTime<.4);let k=R.rope?.68*Math.sin(Math.PI*R.rope.age/.58):0;c.root.position.set(R.x,R.overrun?.25*it:ct?Math.sin(Math.min(1,R.endTime/.4)*Math.PI)*.64:k,R.captainZ),c.root.rotation.set(1.45*it,Ce?0:-R.velocity*.018,ct?-R.endTime*5:-.16*it),c.root.scale.setScalar(nt*(ct?Math.max(.05,1-R.endTime*2):1)),c.animate({time:C,run:le?.91:Ce?0:.09,recoil:R.recoil,merge:Math.max(R.mergeGlow,R.hurt*.62),lean:$e.clamp(R.velocity/9,-1,1)});let Ze=R.boss;f.root.visible=Ze.active&&!Ze.removed&&Ze.z<9;let tt=$e.smoothstep(ce,.25,.92),Et=ce>.92?Math.sin((ce-.92)*19)*Math.exp(-9*(ce-.92)):0,de=Ze.lift*(1-$e.smoothstep(ce,0,.3));f.root.position.set(Ze.x-.26*tt,de+.27*tt+Math.max(0,Et)*.16,Ze.z-.62*tt),f.root.rotation.set(-1.49*tt+.13*Et,0,-.3*tt),v(Ze);let Mt=Ze.skill,ke=Mt?$e.smoothstep(Mt.age,0,Mt.warm)*(1-$e.smoothstep(Mt.age,Mt.warm,Mt.warm+.3)):0,Ye=Mt?Math.sin(Math.PI*$e.clamp((Mt.age-Mt.warm)/.52,0,1)):0;f.pose({charge:ke,release:Ye,mode:q,time:C,walk:le&&Ze.active&&!Ze.defeated?1:0,march:Ze.marched,attack:Ze.attackT,hit:Ze.hit,defeat:ce,kind:Ze.kind,vault:Ze.vault?.t||0,brace:Ze.brace,drive:Ze.special}),l.visible=h.visible=le&&!Ze.defeated&&Ze.attackT>0&&Ze.attackT<.91,l.visible&&(l.position.set(Ze.landX,.047,Ze.landZ),h.position.set(Ze.landX,.051,Ze.landZ),h.scale.setScalar(.3+.7*$e.smoothstep(Ze.attackT,0,.91))),(!Ce||R.overrun)&&m.put(R.x,R.captainZ+it*.4,1.3*nt),f.root.visible&&m.put(Ze.x,Ze.z-tt,3.65-de*.38,1.12+tt*.65);for(let T of[_,g])T.visible=!Ce,T.position.set(R.x,.048,R.captainZ),T.scale.setScalar(nt);m.end(),d.end(),p.end(),x.end(),I&&I.draw(R,a,C,q),D.update($,Me,R.shots,R.incoming),t.render(n,a)}return{draw:B,assets:G,prepareBoss:R=>u.then(()=>f.prepare(R)),resize:K,entryZ(){let R=Math.atan2(14.88,20.65);return 13.2-15/Math.tan(R-$e.degToRad(a.fov/2))},project(R,C,$){return o.set(R,C,$).project(a),{x:(o.x+1)*U/2,y:(1-o.y)*H/2}},feedback(R){D.burst(R.kind,R.x,R.y,R.z,R.strength),R.kind==="slam"||R.kind==="wallBreak"||R.kind==="bossBurst"?P=.85:R.kind==="victory"||R.kind==="vaultLand"?P=Math.max(P,.5):R.kind==="impact"&&(P=Math.max(P,.25))},reset(R){Y=R*.94,P=0,D.reset()},lowerResolution(){L<=1||(L=Math.max(1,L-.22),K())}}}var Sm=Math.PI*2,Em={muzzle:{duration:.25,gain:.33,interval:.18},smallShot:{duration:.08,gain:.076,interval:.105},impact:{duration:.31,gain:.28,interval:.12},wallHit:{duration:.16,gain:.16,interval:.13},cardHit:{duration:.1,gain:.11,interval:.13},supplyBreak:{duration:.25,gain:.21,interval:.1},shieldHit:{duration:.16,gain:.14,interval:.14},wallBreak:{duration:.43,gain:.35,interval:.4},plus:{duration:.22,gain:.18,interval:.105},merge:{duration:.41,gain:.23,interval:.18},slam:{duration:.49,gain:.42,interval:.5},bruiserStrike:{duration:.31,gain:.28,interval:.22},diverStrike:{duration:.36,gain:.22,interval:.1},wardenCast:{duration:.68,gain:.26,interval:.5},drillStrike:{duration:.32,gain:.21,interval:.18},kestrelCast:{duration:.66,gain:.23,interval:.42},engineStrike:{duration:.44,gain:.3,interval:.24},bossBurst:{duration:.79,gain:.4,interval:.7},chainSnap:{duration:.29,gain:.28,interval:.23},discharge:{duration:.41,gain:.26,interval:.23},vaultLand:{duration:.25,gain:.21,interval:.4},victory:{duration:.79,gain:.28,interval:.7},loss:{duration:.63,gain:.25,interval:.57},hit:{duration:.09,gain:.075,interval:.14}};function pb(i,e){let t=i.createBuffer(1,Math.ceil(Em[e].duration*24e3),24e3),n=t.getChannelData(0),s=981273;function r(h,f,u){let d=Math.floor(h*24e3),p=Math.min(n.length,d+Math.ceil(f*24e3)),x=Math.min(.005,f*.1),m=Math.min(.012,f*.16);for(let g=d;g<p;g++){let _=(g-d)/24e3,y=Math.min(1,_/x,(f-_)/m)*Math.exp(-3.35*_/f);n[g]+=u(_/f)*y}}function a(h,f,u,d,p,x=.12){let m=0;r(h,f,g=>{let _=d+(u-d)*(1-g)**3;return m+=Sm*_/24e3,p*(Math.sin(m)+x*Math.sin(2*m+.15))})}function o(h,f,u,d){let p=0,x=0,m=1-Math.exp(-Sm*u/24e3);r(h,f,()=>(s=Math.imul(1664525,s)+1013904223>>>0,p+=m*(s/2147483648-1-p),x+=.014*(p-x),d*(p-x*.65)))}function c(h,f,u,d){a(h,f,u*1.013,u,d,.16),a(h,f*.35,u*2.52,u*2.5,d*.11)}switch(e){case"cardHit":c(0,.09,1150,.42);break;case"supplyBreak":o(0,.068,4200,.51),c(.015,.18,906,.44),c(.07,.16,1326,.36);break;case"shieldHit":a(0,.15,740,365,.56,.18);break;case"muzzle":a(0,.2,213,61,.76,.48),o(0,.093,2400,.64),o(.023,.212,580,.57);break;case"smallShot":a(0,.054,1550,580,.33,.1),o(0,.042,3600,.56);break;case"impact":a(0,.23,115,49,.63,.52),o(.004,.25,1050,.89),o(.044,.23,370,.47);break;case"wallHit":o(0,.045,3100,.56),a(0,.124,650,440,.36),a(.008,.14,1050,750,.19);break;case"wallBreak":a(0,.23,174,57,.61,.33),o(0,.27,1970,.96);for(let[h,f]of[[.079,750],[.147,490],[.227,330]])o(h,.045,2850,.41),a(h,.13,f,f*.81,.22);break;case"plus":c(0,.107,622,.56),c(.06,.15,932,.68);break;case"merge":a(0,.24,320,752,.24),c(0,.16,523,.53),c(.075,.19,659,.59),c(.147,.24,988,.68);break;case"slam":o(0,.18,2e3,.78),a(0,.36,167,43,.96,.58),o(.035,.39,520,.84),o(.092,.13,1400,.44);break;case"bruiserStrike":o(0,.27,670,.7),a(0,.27,153,61,.74);break;case"diverStrike":o(0,.27,2300,.67),a(.01,.26,480,120,.42);break;case"wardenCast":a(0,.44,96,53,.77,.5),o(.05,.57,820,.68);break;case"drillStrike":c(0,.24,1450,.59),c(.05,.24,860,.5);break;case"kestrelCast":o(0,.56,3300,.58),a(.04,.52,830,1320,.35);break;case"engineStrike":a(0,.36,140,45,.81,.45),o(.015,.34,1350,.85);break;case"vaultLand":a(0,.2,115,49,.7),o(.01,.19,720,.61);break;case"chainSnap":o(0,.048,4300,.65),c(.012,.19,1280,.45),c(.059,.18,711,.28);break;case"discharge":a(0,.29,1620,143,.66,.4),o(.05,.29,2900,.49);break;case"bossBurst":a(0,.5,182,41,1,.44),o(0,.12,4600,.85),o(.048,.54,850,.84),c(.23,.28,784,.32),c(.37,.39,1047,.33);break;case"victory":a(0,.35,144,48,.84,.37),o(.032,.31,720,.7);break;case"loss":c(0,.21,392,.57),c(.116,.22,330,.58),a(.246,.35,262,196,.64,.22);break;case"hit":o(0,.061,1290,.58),a(.003,.07,580,280,.24);break}let l=.001;for(let h of n)l=Math.max(l,Math.abs(h));for(let h=0;h<n.length;h++)n[h]*=.89/l;return t}function wm(){let i,e,t,n,s=!1,r=!1,a=new Map,o=new Map,c=new Set;function l(d){c.delete(d),d.source.onended=null,d.source.disconnect(),d.gain.disconnect()}function h(){for(let d of c)d.source.stop(),l(d);o.clear()}function f(){if(!i)return;let d=i.currentTime;t.gain.cancelScheduledValues(d),t.gain.setTargetAtTime(s&&!r?.8:0,d,.008)}function u(){if(s&&i&&i.state!=="closed")return i.resume().catch(()=>{})}return{unlock(){if(s=!0,!i){let p=window.AudioContext||window.webkitAudioContext;if(!p)return;try{i=new p({latencyHint:"interactive"})}catch{return}e=i.createDynamicsCompressor(),e.threshold.value=-12,e.knee.value=9,e.ratio.value=5,e.attack.value=.004,e.release.value=.12,t=i.createGain(),t.gain.value=0,e.connect(t),t.connect(i.destination)}f();let d=u();return n?n.then(u):d},setMuted(d){r=!!d,r&&h(),f()},play(d,p=1){let x=Em[d];if(!x||!s||r||!i||i.state!=="running"||!(p>0))return;let m=i.currentTime;if(m-(o.get(d)??-1/0)<x.interval||c.size>=16)return;o.set(d,m),a.has(d)||a.set(d,pb(i,d));let g=i.createBufferSource(),_=i.createGain(),y={source:g,gain:_};g.buffer=a.get(d);let M=d==="plus"||d==="merge"||d==="victory"||d==="loss";g.playbackRate.value=M?1:.95+Math.random()*.1,_.gain.value=x.gain*Math.min(1.36,.45+.55*Math.sqrt(p)),g.connect(_),_.connect(e),c.add(y),g.onended=()=>l(y),g.start()},pause(){if(s=!1,h(),f(),!i||i.state==="closed")return;let d=i.suspend().catch(()=>{});return n=d,d.then(()=>{n===d&&(n=void 0)}),d}}}var Ve=i=>document.getElementById(i),Ms=Ve("stage"),ra=Ve("game"),mb=Ve("start"),Ao=Ve("startButton"),Im=Ve("veil"),ia=Ve("bossbar"),vs=Ve("tip"),Pm={hybrid:"\u6DF7\u5408",ai:"AI \u8D34\u56FE","3d":"\u7EAF 3D"},Lm={hybrid:"\u961F\u957F\u3001\u9996\u9886\u548C\u5175\u9635\u4F7F\u7528 3D\uFF0C\u968F\u961F\u5C0F\u5175\u4F7F\u7528\u539F\u753B\u3002",ai:"\u4F7F\u7528\u539F\u753B\u89D2\u8272\u548C\u52A8\u6001\u8D34\u56FE\u3002","3d":"\u6240\u6709\u89D2\u8272\u90FD\u4F7F\u7528 3D \u6A21\u578B\uFF0C\u53EF\u770B\u6E05\u8DD1\u52A8\u3001\u70AE\u8EAB\u540E\u5750\u548C\u53CC\u62F3\u7838\u5730\u3002"},gb=matchMedia("(pointer:coarse)").matches;Ve("instruction").textContent=gb?"\u5DE6\u53F3\u62D6\u52A8 \xB7 \u4E0B\u62C9\u540E\u64A4 \xB7 \u81EA\u52A8\u5F00\u706B":"\u65B9\u5411\u952E / WASD \u79FB\u52A8 \xB7 \u81EA\u52A8\u5F00\u706B";function Nm(i){try{return localStorage.getItem(i)}catch{return null}}function Dm(i,e){try{localStorage.setItem(i,e)}catch{}}var xb=new URL(location.href).searchParams.get("art"),Ki=[xb,Nm("squad-art"),"hybrid"].find(i=>Object.prototype.hasOwnProperty.call(Pm,i)),ys=Nm("squad-mute")==="1",On=null,aa=!1,Gf=!1,pn=null,ih=null,bs=!0,sa=0,nr=0,Vf=0,kf=0,Hf=0,Um=0,Wf=!1,Xf=!1,qf=!1,Yf=0,Ai=null,ir=new Set,Ji=wm();Ji.setMuted(ys);function Fm(){let i=ys?"\u5F00\u542F\u58F0\u97F3":"\u5173\u95ED\u58F0\u97F3";Ve("soundIcon").setAttribute("href",ys?"#i-mute":"#i-sound"),Ve("sound").setAttribute("aria-label",i),Ve("sound").title=i}Fm();var fe=new Ho(i=>{i.kind!=="smallShot"&&i.kind!=="loss"&&On?.feedback(i),Ji.play(i.kind,i.strength)}),th=Number(new URL(location.href).searchParams.get("stage"));Number.isInteger(th)&&th>=1&&th<=Qi&&fe.reset(th);for(let i of ca){let e=document.createElement("button"),t=document.createElement("b");t.textContent=String(i.number).padStart(2,"0"),e.append(t,document.createTextNode(i.name)),e.dataset.level=i.number,e.setAttribute("aria-label","\u7B2C "+i.number+" \u5173 "+i.name),e.addEventListener("click",()=>Jf(i.number)),Ve("stageList").append(e)}function Zf(){ir.clear(),Ai=null}function nh(i,e){vs.textContent=i,vs.hidden=!1,Um=fe.elapsed+e}function Kf(i,e){if(Object.prototype.hasOwnProperty.call(Pm,i)){Ki=Gf?i:"3d",Ms.dataset.art=Ki,bs=!0,e&&Dm("squad-art",Ki);for(let t of Ve("options").children)t.setAttribute("aria-pressed",String(t.dataset.art===Ki)),t.disabled=!Gf&&t.dataset.art!=="3d";pn==="art"&&(Ve("detail").textContent=Lm[Ki])}}function Ro(){aa&&(Om(),fe.start(),Ji.unlock(),mb.hidden=!0,Ve("pause").hidden=!1,Ms.dataset.phase=fe.phase)}function Jf(i=fe.stage){Zf(),fe.reset(i),On.prepareBoss(fe.boss.kind).then(()=>{bs=!0}),On.reset(fe.x),sa=0,Vf=0,vs.hidden=!0,Wf=!1,Xf=!1,qf=!1,Yf=0;let e=new URL(location.href);e.searchParams.set("stage",fe.stage),history.replaceState(null,"",e),Ro()}function sr(i){if(aa){if(Zf(),sa=0,pn=i,bs=!0,Im.hidden=!1,Ve("options").hidden=i!=="art",Ve("stageList").hidden=i!=="levels",Ve("dialog").classList.toggle("levels",i==="levels"),Ve("selectStage").hidden=i!=="pause"&&i!=="result",i==="levels"){Ji.pause(),Ve("dialogTitle").textContent="\u9009\u62E9\u5173\u5361",Ve("detail").textContent="",Ve("continue").textContent="\u8FD4\u56DE";for(let e of Ve("stageList").children)e.setAttribute("aria-current",String(+e.dataset.level===fe.stage))}if(Ve("secondary").hidden=i!=="pause",i==="art"&&(Ji.pause(),Ve("dialogTitle").textContent="\u89D2\u8272\u753B\u9762",Ve("detail").textContent=Lm[Ki],Ve("continue").textContent="\u786E\u5B9A",Kf(Ki,!1)),i==="pause"&&(Ji.pause(),Ve("dialogTitle").textContent="\u5DF2\u6682\u505C",Ve("detail").textContent="\u7B2C "+fe.stage+" \u5173 \xB7 "+fe.route.name,Ve("continue").textContent="\u7EE7\u7EED\u6E38\u620F"),i==="result"){let e=fe.phase==="won";if(e)Ve("dialogTitle").textContent=fe.stage===Qi?"\u5168\u90E8\u901A\u5173":`\u7B2C ${fe.stage} \u5173\u901A\u8FC7`,Ve("detail").textContent=`\u51FB\u8D25 Boss\uFF0C\u51FB\u9000 ${fe.score} \u540D\u7EA2\u5175\u3002`;else{let t={signature:["\u961F\u957F\u51FA\u5C40",Tn[fe.boss.kind].name+"\u7684"+Tn[fe.boss.kind].skill+"\u547D\u4E2D\u4E86\u961F\u957F\u3002"],bossShot:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB Boss \u7684\u5F39\u5E55\u51FB\u5012\u3002"],gap:["\u961F\u957F\u5760\u6865","\u9047\u5230\u7F3A\u53E3\u65F6\uFF0C\u63D0\u524D\u6362\u9053\uFF0C\u6216\u5E26\u4E0A\u67B6\u6865\u8865\u7ED9\u3002"],infantry:["\u5C0F\u961F\u5168\u706D","\u7EA2\u5175\u5DF2\u8D8A\u8FC7\u9632\u7EBF\u3002"],wall:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB\u786C\u5899\u63A8\u51FA\u4E86\u8DD1\u9053\u3002"],breach:["\u9632\u7EBF\u5931\u5B88","Boss \u7A81\u7834\u4E86\u9632\u7EBF\u3002"],slam:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB Boss \u7684\u843D\u5730\u51B2\u51FB\u51FB\u5012\u3002"]},n=fe.boss.active&&!fe.boss.defeated?`Boss \u8FD8\u5269 ${Math.ceil(fe.boss.hp)} / ${fe.boss.maxHp} \u751F\u547D`:"\u7EA2\u5175\u7A81\u7834\u4E86\u961F\u4F0D\u3002",[s,r]=t[fe.lossReason]||["\u5C0F\u961F\u5168\u706D",n];Ve("dialogTitle").textContent=s,Ve("detail").textContent=r}Ve("continue").textContent=e&&fe.stage<Qi?"\u4E0B\u4E00\u5173":"\u518D\u73A9\u4E00\u6B21"}if(i==="levels"){let e=Ve("stageList").querySelector("[aria-current=true]");e.focus({preventScroll:!0}),e.scrollIntoView({block:"nearest"})}else Ve("continue").focus({preventScroll:!0})}}function Om(){bs=!0,pn=null,ih=null,Im.hidden=!0,sa=0}function Bm(){let i=pn,e=ih;if(Om(),i==="result"){Jf(fe.phase==="won"?fe.stage<Qi?fe.stage+1:1:fe.stage);return}if((i==="art"||i==="levels")&&e){sr(e);return}fe.playing?Ji.unlock():fe.phase==="ready"&&Ao.focus({preventScroll:!0})}function zm(){!aa||!fe.playing&&fe.phase!=="ready"&&!fe.resultReady||(ih=pn,sr("levels"))}Ve("level").addEventListener("click",zm);Ve("selectStage").addEventListener("click",zm);Ve("continue").addEventListener("click",Bm);Ve("secondary").addEventListener("click",()=>Jf());Ao.addEventListener("click",Ro);Ve("sound").addEventListener("click",()=>{ys=!ys,Dm("squad-mute",ys?"1":"0"),Ji.setMuted(ys),ys||Ji.unlock(),Fm()});Ve("pause").addEventListener("click",()=>{fe.playing&&sr("pause")});Ve("styles").addEventListener("click",()=>{ih=pn,sr("art")});for(let i of Ve("options").children)i.addEventListener("click",()=>Kf(i.dataset.art,!0));ra.addEventListener("pointerdown",i=>{!aa||pn||!i.isPrimary||i.button!==0||(fe.phase==="ready"&&Ro(),fe.playing&&(i.preventDefault(),Ai={id:i.pointerId,start:i.clientX,startY:i.clientY,world:fe.targetX,back:fe.targetZ},ra.setPointerCapture(i.pointerId)))});ra.addEventListener("pointermove",i=>{!Ai||i.pointerId!==Ai.id||pn||fe.aim(Ai.world+(i.clientX-Ai.start)*14.8/Ms.clientWidth,Ai.back+(i.clientY-Ai.startY)*11/Ms.clientHeight)});function _b(i){i.pointerId===Ai?.id&&(Ai=null)}for(let i of["pointerup","pointercancel","lostpointercapture"])ra.addEventListener(i,_b);var km=["ArrowLeft","KeyA"],Hm=["ArrowRight","KeyD"],Gm=["ArrowUp","KeyW"],Vm=["ArrowDown","KeyS"];window.addEventListener("keydown",i=>{if(!aa||i.altKey||i.ctrlKey||i.metaKey)return;let e=i.code;if(pn){pn!=="result"&&(e==="Escape"||e==="KeyP")&&!i.repeat&&(i.preventDefault(),Bm());return}if(km.includes(e)||Hm.includes(e)||Gm.includes(e)||Vm.includes(e)){i.preventDefault(),fe.phase==="ready"&&Ro(),ir.add(e);return}i.repeat||((e==="Space"||e==="Enter")&&fe.phase==="ready"&&!(i.target instanceof HTMLButtonElement&&i.target!==Ao)?(i.preventDefault(),Ro()):(e==="KeyP"||e==="Escape"||e==="Space")&&fe.playing&&!(e==="Space"&&i.target instanceof HTMLButtonElement)&&(i.preventDefault(),sr("pause")))});window.addEventListener("keyup",i=>ir.delete(i.code));function $f(){Zf(),fe.playing&&!pn&&sr("pause")}window.addEventListener("blur",$f);document.addEventListener("visibilitychange",()=>{nr=0,document.hidden&&$f()});var Tm=-1,Am=-1,Rm=-1;function vb(){let i=fe.allies.length,e=fe.cannonDamage,t=Ve("level"),n="\u7B2C "+fe.stage+" \u5173";t.textContent!==n&&(t.textContent=n),t.title=fe.route.name+" \xB7 \u9009\u62E9\u5173\u5361";let a=[Object.entries(fe.buffs).filter(([,h])=>h>0).map(([h,f])=>Pn[h].label+" "+Math.ceil(f)+"\u79D2").join(" \xB7 "),fe.planks?"\u4FBF\u6865 \xD7"+fe.planks:"",fe.chill>0?"\u971C\u51BB "+Math.ceil(fe.chill)+"\u79D2":""].filter(Boolean).join(" \xB7 "),o=Ve("buffs");o.textContent!==a&&(o.textContent=a),o.hidden=!a||!fe.playing,i!==Tm&&(Ve("count").textContent=i,Tm=i),e!==Am&&(Ve("power").textContent=e,Am=e),Ms.dataset.phase=fe.phase;let c=Ve("armorMeter");if(c.hidden=!fe.playing||fe.armor===3,!c.hidden){let h=On.project(fe.x,1.94*fe.visualScale,fe.captainZ);c.style.transform="translate("+h.x.toFixed(1)+"px,"+h.y.toFixed(1)+"px)",c.dataset.value!==String(fe.armor)&&(c.dataset.value=fe.armor,c.setAttribute("aria-label","\u961F\u957F\u62A4\u7532 "+fe.armor+" / 3"))}let l=fe.boss;if(ia.hidden=!l.active||l.defeated||On.project(l.x,0,l.z).y<3,!ia.hidden){Ve("bossName").textContent!==Tn[l.kind].name&&(Ve("bossName").textContent=Tn[l.kind].name);let[h,f]=Tn[l.kind].crown,u=On.project(l.x,h+l.lift,l.z+f);ia.style.transform=`translate(${u.x.toFixed(1)}px,${Math.max(53,u.y).toFixed(1)}px)`}l.hp!==Rm&&(ia.firstElementChild.style.transform=`scaleX(${l.hp/l.maxHp})`,ia.lastElementChild.textContent=Math.ceil(l.hp),Rm=l.hp),fe.playing&&!pn&&(!Wf&&fe.wall.hp>0&&fe.distance>=10&&fe.wall.z<0&&(Wf=!0,nh("\u51FB\u788E\u786C\u5899\uFF0C\u6216\u5411\u5DE6\u907F\u5F00",3)),fe.wall.hp<=0&&vs.textContent==="\u51FB\u788E\u786C\u5899\uFF0C\u6216\u5411\u5DE6\u907F\u5F00"&&(vs.hidden=!0),!ia.hidden&&!Xf&&(Xf=!0,nh("\u5BF9\u51C6 Boss \u5F00\u706B\uFF0C\u8DF3\u8D77\u65F6\u907F\u5F00\u843D\u70B9",2.2)),l.defeated&&!qf&&l.defeatAge>=.92&&(qf=!0,nh("Boss \u5DF2\u5012\u4E0B\uFF0C\u6E05\u7406\u5269\u4F59\u7EA2\u5175",2.3)),fe.hint&&fe.hint.id!==Yf&&(Yf=fe.hint.id,nh(fe.hint.text,2.1)),!vs.hidden&&fe.elapsed>=Um&&(vs.hidden=!0)),!fe.playing&&fe.phase!=="ready"&&(vs.hidden=!0,Ve("pause").hidden=!0,fe.resultReady&&!pn&&sr("result"))}function Wm(i){if(requestAnimationFrame(Wm),document.hidden)return;if(pn&&!bs){nr=i;return}if(!pn&&fe.phase==="ready"&&nr&&i-nr<1e3/29&&!bs)return;bs=!1;let e=nr?(i-nr)/1e3:1/60;nr=i;let t=Math.min(.08,Math.max(0,e)),n=0;if(!pn){if(Vf+=t,fe.playing||fe.phase==="won"||fe.phase==="lost")for(sa+=t;sa>=1/60;){let s=Number(Hm.some(a=>ir.has(a)))-Number(km.some(a=>ir.has(a))),r=Number(Vm.some(a=>ir.has(a)))-Number(Gm.some(a=>ir.has(a)));fe.tick(1/60,s,r),n+=fe.worldAdvance,sa-=1/60}fe.playing&&(Hf+=t,e>.031&&kf++,Hf>2.1&&(kf>24&&On.lowerResolution(),kf=0,Hf=0))}On.draw(fe,Vf,pn?0:t,n,Ki),vb()}function Cm(i){let e=Ve("problem");e.hidden=!1,e.textContent=i;let t=document.createElement("button");t.textContent="\u91CD\u65B0\u8F7D\u5165",t.onclick=()=>location.reload(),e.append(t)}async function yb(){try{On=bm(ra,Ms),On.reset(fe.x);let i=()=>{On.resize(),fe.entryZ=On.entryZ(),bs=!0};i(),new ResizeObserver(i).observe(Ms),window.addEventListener("resize",i),ra.addEventListener("webglcontextlost",e=>{e.preventDefault(),$f(),Cm("\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E2D\u65AD\uFF0C\u8BF7\u91CD\u65B0\u8F7D\u5165\u6E38\u620F\u3002")}),Gf=await On.assets,await On.prepareBoss(fe.boss.kind),Kf(Ki,!1),aa=!0,Ms.dataset.phase="ready",Ao.disabled=!1,Ao.lastElementChild.textContent="\u5F00\u59CB\u6E38\u620F",requestAnimationFrame(Wm)}catch(i){console.error(i),Cm("\u6E38\u620F\u9700\u8981\u652F\u6301 WebGL 2 \u7684\u6D4F\u89C8\u5668\uFF0C\u8BF7\u5728 Safari \u6216 Chrome \u4E2D\u6253\u5F00\u3002")}}yb();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
