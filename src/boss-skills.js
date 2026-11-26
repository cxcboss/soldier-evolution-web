const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
// Each target is locked when the boss winds up and shared by the warning, the projectile and the hit.
export const bosses = {
  bruiser: {
    crown: [4.91, 0],
    name: '铁拳队长',
    skill: '震桥重拳',
    prompt: '重拳蓄力，避开拳印',
    color: '#ffc66c',
    height: 4.5,
    aim: 2.05,
    warm: 0.86,
    flight: 0.65,
    cooldown: 6.3,
  },
  diver: {
    crown: [3.74, -1.78],
    name: '潮钳巨蟹',
    skill: '双钳潮汐',
    prompt: '双钳合击，两道水环之间有空隙',
    color: '#39e4d5',
    height: 2.32,
    aim: 1.12,
    warm: 0.9,
    flight: 0.86,
    cooldown: 6.3,
  },
  warden: {
    crown: [3.47, -1.49],
    name: '金角重犀',
    skill: '铁角冲锋',
    prompt: '重犀压低了角，闪开金色直道',
    color: '#ffb847',
    height: 2.84,
    aim: 1.55,
    warm: 1.12,
    flight: 0.82,
    cooldown: 7.1,
  },
  drill: {
    crown: [3.79, -1.65],
    name: '紫晶地龙',
    skill: '地脉晶刺',
    prompt: '晶刺逐个冒出，离开紫圈',
    color: '#ce82ff',
    height: 3.39,
    aim: 1.6,
    warm: 0.89,
    flight: 0.52,
    cooldown: 6.4,
  },
  kestrel: {
    crown: [4.12, -2.03],
    name: '冰翼飞龙',
    skill: '极寒吐息',
    prompt: '冰龙正在吸气，离开霜蓝扇形',
    color: '#78eaff',
    height: 3.35,
    aim: 1.92,
    warm: 1.15,
    flight: 0.45,
    cooldown: 6.5,
  },
  engine: {
    crown: [3.72, -1.9],
    name: '熔炉蛛机',
    skill: '熔芯双炮',
    prompt: '双炮锁定，离开橙红落点',
    color: '#ff8253',
    height: 2.68,
    aim: 1.33,
    warm: 0.94,
    flight: 1.12,
    cooldown: 6.8,
  },
};
export const castProgress = (skill, mark) =>
  clamp((skill.age - skill.warm - mark.delay) / skill.flight, 0, 1);
export function inStrike(skill, mark, x, z, margin = 0) {
  if (mark.shape === 'circle') return Math.hypot(x - mark.x, z - mark.z) < mark.radius + margin;
  const dx = mark.x - skill.x,
    dz = mark.z - skill.z,
    length = Math.hypot(dx, dz) || 1;
  const along = ((x - skill.x) * dx + (z - skill.z) * dz) / length;
  const width = mark.shape === 'cone' ? mark.radius * clamp(along / length, 0.05, 1) : mark.radius;
  return (
    along > -0.1 &&
    along < length + 1.65 + margin &&
    Math.abs((x - skill.x) * dz - (z - skill.z) * dx) / length < width + margin
  );
}
export function startSkill(b) {
  const boss = b.boss,
    kind = boss.kind,
    d = bosses[kind],
    x = b.x,
    z = b.captainZ,
    side = x > 0.7 ? -1 : 1;
  const marks = [];
  const target = (x, z, radius, delay = 0, shape = 'circle') =>
    marks.push({ x: clamp(x, -5.85, 5.85), z, radius, delay, shape, hit: false });
  if (kind === 'diver') {
    target(x - 1.55, z, 0.96);
    target(x + 1.55, z, 0.96, 0.13);
  } else if (kind === 'warden') target(boss.x, z + 0.42, 1.04, 0, 'strip');
  else if (kind === 'drill') {
    target(x, z - 0.64, 0.89);
    target(x + side * 0.68, z + 0.07, 0.88, 0.26);
    target(x + side * 1.45, z + 0.68, 0.91, 0.52);
  } else if (kind === 'kestrel') target(x, z + 0.74, 1.31, 0, 'cone');
  else if (kind === 'engine') {
    target(x, z - 0.17, 1.12);
    target(x + side * 2.42, z + 0.52, 1.14, 0.37);
  } else target(x, z - 0.44, 1.16);
  boss.skill = {
    kind,
    x: boss.x,
    z: boss.z + 0.38,
    height: d.aim,
    age: 0,
    warm: d.warm,
    flight: d.flight,
    marks,
    casualties: 0,
    damagedCaptain: false,
  };
  b.notice(d.prompt);
  return boss.skill;
}
function strike(b, cast, mark) {
  const s = b.stage < 7 ? 2 : 3;
  b.event(cast.kind + 'Strike', mark.x, 0.1, mark.z);
  b.allies = b.allies.filter((a) => {
    if (cast.casualties >= s || !inStrike(cast, mark, a.x, a.z, 0.12)) return true;
    const body = b.fall(a, 'blue', 0.7, mark.x);
    body.vy = cast.kind === 'engine' ? 3.8 : 2.6;
    cast.casualties++;
    return false;
  });
  if (cast.damagedCaptain || !inStrike(cast, mark, b.x, b.captainZ, 0.16)) return;
  cast.damagedCaptain = true;
  if (b.buffs.shield > 0) {
    b.event('shieldHit', b.x, 0.6, b.captainZ);
    return;
  }
  if (cast.kind === 'kestrel') b.chill = 1.6;
  if (b.hitGuard > 0) return;
  b.hurt = 1;
  b.hitGuard = 1.15;
  b.armor--;
  if (b.armor <= 0) {
    b.lossReason = 'signature';
    b.finish(false);
  }
}
export function advanceSkill(b, dt) {
  const boss = b.boss;
  const siegeFinale = b.route.siege && boss.hp <= boss.maxHp * 0.5;
  if (siegeFinale && !boss.secondWind) {
    boss.secondWind = true;
    boss.nextCast = Math.min(boss.nextCast, 1.3);
    b.notice('地龙进入狂攻，连续避开晶刺');
  }
  if (!boss.skill) {
    boss.nextCast -= dt;
    if (
      boss.z >= -30 &&
      boss.z < (siegeFinale ? -1.65 : -5.2) &&
      !b.activeGround.some((p) => p.finale && !p.crossed && Math.abs(p.z - boss.z) < 7) &&
      !boss.vault &&
      !boss.attackT &&
      boss.nextCast <= 0
    )
      startSkill(b);
    return;
  }
  const s = boss.skill;
  s.age += dt;
  if (!s.fired && s.age >= s.warm) {
    s.fired = true;
    b.event(s.kind + 'Cast', boss.x, bosses[s.kind].aim, boss.z + 0.37);
  }
  for (const mark of s.marks)
    if (!mark.hit && castProgress(s, mark) >= 1) {
      mark.hit = true;
      strike(b, s, mark);
      if (!b.playing) return;
    }
  if (s.age > s.warm + s.flight + s.marks.at(-1).delay + 0.65) {
    boss.skill = null;
    boss.nextCast = siegeFinale ? 1.8 : bosses[boss.kind].cooldown;
  }
}
