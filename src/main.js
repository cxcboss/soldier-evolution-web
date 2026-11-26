import { Battle } from './battle.js';
import { supplies, lastStage } from './supplies.js';
import { campaign, chapters } from './campaign.js';
import { bosses } from './boss-skills.js';
import { makeView } from './view.js';
import { createAudio } from './audio.js';

const $ = (id) => document.getElementById(id);
const stage = $('stage'),
  canvas = $('game'),
  startPanel = $('start'),
  startButton = $('startButton');
const dlg = $('veil'),
  bossBar = $('bossbar'),
  tip = $('tip');
const artNames = { hybrid: '混合', ai: 'AI 贴图', '3d': '纯 3D' };
const artDescriptions = {
  hybrid: '队长和 Boss 使用 3D，红蓝小兵使用动态原画。',
  ai: '使用原画角色和动态贴图。',
  '3d': '所有角色都使用 3D 模型，可看清跑动、炮身后坐和双拳砸地。',
};
const coarse = matchMedia('(pointer:coarse)').matches;
$('instruction').textContent = coarse
  ? '左右拖动 · 下拉后撤 · 自动开火'
  : '方向键 / WASD 移动 · 自动开火';
function read(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}
const artParam = new URL(location.href).searchParams.get('art');
let mode = [artParam, read('squad-art'), 'hybrid'].find((k) =>
  Object.prototype.hasOwnProperty.call(artNames, k),
);
let muted = read('squad-mute') === '1',
  view = null,
  ready = false,
  hasSprites = false,
  panel = null,
  returnPanel = null;
let needsPaint = true;
let accumulator = 0,
  last = 0,
  visualTime = 0,
  lowerFrames = 0,
  frameWindow = 0,
  tipUntil = 0,
  toldWall = false,
  toldBoss = false,
  toldClear = false,
  lastHint = 0,
  activePointer = null;
const keys = new Set(),
  audio = createAudio();
audio.setMuted(muted);
function soundLabel() {
  const title = muted ? '开启声音' : '关闭声音';
  $('soundIcon').setAttribute('href', muted ? '#i-mute' : '#i-sound');
  $('sound').setAttribute('aria-label', title);
  $('sound').title = title;
}
soundLabel();
const battle = new Battle((e) => {
  if (e.kind !== 'smallShot' && e.kind !== 'loss') view?.feedback(e);
  audio.play(e.kind, e.strength, e.supply);
});
const requestedStage = Number(new URL(location.href).searchParams.get('stage'));
if (Number.isInteger(requestedStage) && requestedStage >= 1 && requestedStage <= lastStage)
  battle.reset(requestedStage);
function missionLabel(route) {
  return route.chapter.name + (route.number === 10 ? ' · 高难' : '');
}
$('missionNumber').textContent = String(battle.stage).padStart(2, '0');
$('missionChapter').textContent = missionLabel(battle.route);
$('missionName').textContent = battle.route.name;
for (const chapter of chapters) {
  const group = document.createElement('section');
  group.className = 'chapter';
  group.dataset.theme = chapter.theme;
  const heading = document.createElement('header');
  heading.className = 'chapter-heading';
  const title = document.createElement('h3');
  title.textContent = chapter.name;
  const span = document.createElement('span');
  span.textContent = String(chapter.first).padStart(2, '0') + ' — ' + String(chapter.last).padStart(2, '0');
  heading.append(title, span);
  const stops = document.createElement('div');
  stops.className = 'chapter-stages';
  for (const route of campaign.slice(chapter.first - 1, chapter.last)) {
    const button = document.createElement('button');
    const number = document.createElement('b');
    number.textContent = String(route.number).padStart(2, '0');
    const name = document.createElement('span');
    name.className = 'stop-name';
    name.textContent = route.name;
    button.dataset.level = route.number;
    button.setAttribute('aria-label', '第 ' + route.number + ' 关 ' + route.name);
    button.append(number, name);
    if (route.number === 10) {
      const badge = document.createElement('small');
      badge.className = 'siege-label';
      badge.textContent = '高难';
      button.append(badge);
      button.dataset.hard = '';
      button.setAttribute('aria-label', '第 10 关 ' + route.name + ' 高难');
    }
    button.addEventListener('click', () => restart(route.number));
    stops.append(button);
  }
  group.append(heading, stops);
  $('stageList').append(group);
}
$('stageList').addEventListener('keydown', (e) => {
  const steps = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -5, ArrowDown: 5 };
  if (!Object.prototype.hasOwnProperty.call(steps, e.code) || !e.target.dataset.level) return;
  const next = Math.min(lastStage, Math.max(1, +e.target.dataset.level + steps[e.code]));
  e.preventDefault();
  $('stageList').querySelector('[data-level="' + next + '"]').focus();
});
function release() {
  keys.clear();
  activePointer = null;
}
function message(text, seconds) {
  tip.textContent = text;
  tip.hidden = false;
  tipUntil = battle.elapsed + seconds;
}
function chooseArt(style, persist) {
  if (!Object.prototype.hasOwnProperty.call(artNames, style)) return;
  mode = hasSprites ? style : '3d';
  stage.dataset.art = mode;
  needsPaint = true;
  if (persist) save('squad-art', mode);
  for (const b of $('options').children) {
    b.setAttribute('aria-pressed', String(b.dataset.art === mode));
    b.disabled = !hasSprites && b.dataset.art !== '3d';
  }
  if (panel === 'art') $('detail').textContent = artDescriptions[mode];
}
function start() {
  if (!ready) return;
  hidePanel();
  battle.start();
  audio.unlock();
  startPanel.hidden = true;
  $('pause').hidden = false;
  stage.dataset.phase = battle.phase;
}
function restart(level = battle.stage) {
  release();
  battle.reset(level);
  view.prepareBoss(battle.boss.kind).then(() => {
    needsPaint = true;
  });
  view.reset(battle.x);
  accumulator = 0;
  visualTime = 0;
  tip.hidden = true;
  toldWall = false;
  toldBoss = false;
  toldClear = false;
  lastHint = 0;
  const address = new URL(location.href);
  address.searchParams.set('stage', battle.stage);
  history.replaceState(null, '', address);
  start();
}
function showPanel(which) {
  if (!ready) return;
  release();
  accumulator = 0;
  panel = which;
  needsPaint = true;
  dlg.hidden = false;
  stage.querySelector('.hud').inert = true;
  startPanel.inert = true;
  const panelKind = which === 'result' ? battle.phase : which;
  const panelIcons = { art: 'art', levels: 'map', pause: 'pause', won: 'medal', lost: 'retreat' };
  $('dialog').dataset.panel = panelKind;
  $('dialogIcon').setAttribute('href', '#i-' + panelIcons[panelKind]);
  $('dialogChapter').textContent = which === 'levels' ? '港区远征' : missionLabel(battle.route);
  $('resultStats').hidden = which !== 'result';
  $('options').hidden = which !== 'art';
  $('stageList').hidden = which !== 'levels';
  $('dialog').classList.toggle('levels', which === 'levels');
  $('selectStage').hidden = which !== 'pause' && which !== 'result';
  if (which === 'levels') {
    audio.pause();
    $('dialogTitle').textContent = '战役地图';
    $('detail').textContent = '';
    $('continue').textContent = '返回';
    for (const button of $('stageList').querySelectorAll('[data-level]'))
      button.setAttribute('aria-current', String(+button.dataset.level === battle.stage));
  }
  $('secondary').hidden = which !== 'pause';
  if (which === 'art') {
    audio.pause();
    $('dialogTitle').textContent = '角色画面';
    $('detail').textContent = artDescriptions[mode];
    $('continue').textContent = '确定';
    chooseArt(mode, false);
  }
  if (which === 'pause') {
    audio.pause();
    $('dialogTitle').textContent = '已暂停';
    $('detail').textContent = '第 ' + battle.stage + ' 关 · ' + battle.route.name;
    $('continue').textContent = '继续游戏';
  }
  if (which === 'result') {
    const win = battle.phase === 'won';
    const seconds = Math.floor(battle.elapsed);
    $('resultKills').textContent = battle.score;
    $('resultTime').textContent = Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
    if (win) {
      $('dialogTitle').textContent =
        battle.stage === lastStage ? '全部通关' : `第 ${battle.stage} 关通过`;
      $('detail').textContent = battle.stage < lastStage ? '下一站 · ' + campaign[battle.stage].name : '小队已完成全部航线。';
    } else {
      const losses = {
        signature: [
          '队长出局',
          bosses[battle.boss.kind].name + '的' + bosses[battle.boss.kind].skill + '命中了队长。',
        ],
        bossShot: ['队长出局', '队长被 Boss 的弹幕击倒。'],
        gap: ['队长坠桥', '遇到缺口时，提前换道，或带上架桥补给。'],
        infantry: ['小队全灭', '红兵已越过防线。'],
        skyfall: ['队长出局', '队长被落下的重物击中。'],
        wall: ['队长出局', '队长被硬墙推出了跑道。'],
        breach: ['防线失守', 'Boss 突破了防线。'],
        slam: ['队长出局', '队长被 Boss 的落地冲击击倒。'],
      };
      const fallback =
        battle.boss.active && !battle.boss.defeated
          ? `Boss 还剩 ${Math.ceil(battle.boss.hp)} / ${battle.boss.maxHp} 生命`
          : '红兵突破了队伍。';
      const [title, detail] = losses[battle.lossReason] || ['小队全灭', fallback];
      $('dialogTitle').textContent = title;
      $('detail').textContent = detail;
    }
    $('continue').textContent = win && battle.stage < lastStage ? '下一关' : '再玩一次';
  }
  if (which === 'levels') {
    const current = $('stageList').querySelector('[aria-current=true]');
    current.focus({ preventScroll: true });
    current.scrollIntoView({ block: 'nearest' });
  } else $('continue').focus({ preventScroll: true });
}
function hidePanel() {
  needsPaint = true;
  panel = null;
  returnPanel = null;
  dlg.hidden = true;
  stage.querySelector('.hud').inert = false;
  startPanel.inert = false;
  accumulator = 0;
}
function resume() {
  const old = panel,
    prev = returnPanel;
  hidePanel();
  if (old === 'result') {
    restart(
      battle.phase === 'won' ? (battle.stage < lastStage ? battle.stage + 1 : 1) : battle.stage,
    );
    return;
  }
  if ((old === 'art' || old === 'levels') && prev) {
    showPanel(prev);
    return;
  }
  if (battle.playing) {
    audio.unlock();
  } else if (battle.phase === 'ready') startButton.focus({ preventScroll: true });
}
function chooseLevel() {
  if (!ready || (!battle.playing && battle.phase !== 'ready' && !battle.resultReady)) return;
  returnPanel = panel;
  showPanel('levels');
}
$('level').addEventListener('click', chooseLevel);
$('selectStage').addEventListener('click', chooseLevel);
$('continue').addEventListener('click', resume);
$('secondary').addEventListener('click', () => restart());
startButton.addEventListener('click', start);
$('sound').addEventListener('click', () => {
  muted = !muted;
  save('squad-mute', muted ? '1' : '0');
  audio.setMuted(muted);
  if (!muted) audio.unlock();
  soundLabel();
});
$('pause').addEventListener('click', () => {
  if (battle.playing) showPanel('pause');
});
$('styles').addEventListener('click', () => {
  returnPanel = panel;
  showPanel('art');
});
for (const b of $('options').children)
  b.addEventListener('click', () => chooseArt(b.dataset.art, true));
canvas.addEventListener('pointerdown', (e) => {
  if (!ready || panel || !e.isPrimary || e.button !== 0) return;
  if (battle.phase === 'ready') start();
  if (!battle.playing) return;
  e.preventDefault();
  activePointer = {
    id: e.pointerId,
    x: e.clientX,
    y: e.clientY,
  };
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove', (e) => {
  if (!activePointer || e.pointerId !== activePointer.id || panel) return;
  battle.aim(
    battle.targetX + ((e.clientX - activePointer.x) * 14.8) / stage.clientWidth,
    battle.targetZ + ((e.clientY - activePointer.y) * 11) / stage.clientHeight,
  );
  // Discard overtravel at either rail so a thumb reversal moves the squad immediately.
  activePointer.x = e.clientX;
  activePointer.y = e.clientY;
});
function endPointer(e) {
  if (e.pointerId === activePointer?.id) activePointer = null;
}
for (const name of ['pointerup', 'pointercancel', 'lostpointercapture'])
  canvas.addEventListener(name, endPointer);
const left = ['ArrowLeft', 'KeyA'],
  right = ['ArrowRight', 'KeyD'],
  up = ['ArrowUp', 'KeyW'],
  down = ['ArrowDown', 'KeyS'];
window.addEventListener('keydown', (e) => {
  if (!ready || e.altKey || e.ctrlKey || e.metaKey) return;
  const k = e.code;
  if (panel) {
    if (panel !== 'result' && (k === 'Escape' || k === 'KeyP') && !e.repeat) {
      e.preventDefault();
      resume();
    }
    return;
  }
  if (left.includes(k) || right.includes(k) || up.includes(k) || down.includes(k)) {
    e.preventDefault();
    if (battle.phase === 'ready') start();
    keys.add(k);
    return;
  }
  if (e.repeat) return;
  if (
    (k === 'Space' || k === 'Enter') &&
    battle.phase === 'ready' &&
    !(e.target instanceof HTMLButtonElement && e.target !== startButton)
  ) {
    e.preventDefault();
    start();
  } else if (
    (k === 'KeyP' || k === 'Escape' || k === 'Space') &&
    battle.playing &&
    !(k === 'Space' && e.target instanceof HTMLButtonElement)
  ) {
    e.preventDefault();
    showPanel('pause');
  }
});
window.addEventListener('keyup', (e) => keys.delete(e.code));
function background() {
  release();
  if (battle.playing && !panel) showPanel('pause');
}
window.addEventListener('blur', background);
document.addEventListener('visibilitychange', () => {
  last = 0;
  if (document.hidden) background();
});
let lastCount = -1,
  lastPower = -1,
  lastHP = -1,
  lastProgress = -1;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function updateStat(id, current, previous) {
  if (current === previous) return;
  const value = $(id);
  value.textContent = current;
  if (!battle.playing || previous < 0 || reducedMotion.matches || !value.animate) return;
  for (const animation of value.getAnimations()) animation.cancel();
  value.animate(
    [
      { transform: 'scale(1.17)', color: current > previous ? '#ffe097' : '#ffa488' },
      { transform: 'scale(1)', color: '#fff9e9' },
    ],
    { duration: 240, easing: 'ease-out' },
  );
}
function hud() {
  const n = battle.allies.length,
    power = battle.cannonDamage;
  const level = $('level');
  const levelText = '第 ' + battle.stage + ' 关';
  if ($('levelText').textContent !== levelText) $('levelText').textContent = levelText;
  const progress = Math.min(100, Math.floor((100 * battle.row) / battle.finaleRow));
  if (progress !== lastProgress) {
    $('progress').firstElementChild.style.transform = 'scaleX(' + progress / 100 + ')';
    $('progress').setAttribute('aria-valuenow', String(progress));
    lastProgress = progress;
  }
  level.title = battle.route.name + ' · 选择关卡';
  const active = Object.entries(battle.buffs).filter(([, time]) => time > 0);
  const activeText = active
    .map(([key, time]) => supplies[key].label + ' ' + Math.ceil(time) + '秒')
    .join(' · ');
  const stateText = [
    activeText,
    battle.planks ? '便桥 ×' + battle.planks : '',
    battle.chill > 0 ? '霜冻 ' + Math.ceil(battle.chill) + '秒' : '',
  ]
    .filter(Boolean)
    .join(' · ');
  const buffs = $('buffs');
  if (buffs.textContent !== stateText) buffs.textContent = stateText;
  buffs.hidden = !stateText || !battle.playing;
  updateStat('count', n, lastCount);
  updateStat('power', power, lastPower);
  lastCount = n;
  lastPower = power;
  stage.dataset.phase = battle.phase;
  const armor = $('armorMeter');
  armor.hidden = !battle.playing || battle.armor === 3;
  if (!armor.hidden) {
    const p = view.project(battle.x, 1.94 * battle.visualScale, battle.captainZ);
    armor.style.transform = 'translate(' + p.x.toFixed(1) + 'px,' + p.y.toFixed(1) + 'px)';
    if (armor.dataset.value !== String(battle.armor)) {
      armor.dataset.value = battle.armor;
      armor.setAttribute('aria-label', '队长护甲 ' + battle.armor + ' / 3');
    }
  }
  const b = battle.boss;
  bossBar.hidden = !b.active || b.defeated || view.project(b.x, 0, b.z).y < 3;
  if (!bossBar.hidden) {
    if ($('bossName').textContent !== bosses[b.kind].name)
      $('bossName').textContent = bosses[b.kind].name;
    const [height, offset] = bosses[b.kind].crown;
    const p = view.project(b.x, height + b.lift, b.z + offset);
    bossBar.style.transform = `translate(${p.x.toFixed(1)}px,${Math.max(53, p.y).toFixed(1)}px)`;
  }
  if (b.hp !== lastHP) {
    bossBar.firstElementChild.style.transform = `scaleX(${b.hp / b.maxHp})`;
    bossBar.lastElementChild.textContent = Math.ceil(b.hp);
    lastHP = b.hp;
  }
  if (battle.playing && !panel) {
    if (!toldWall && battle.wall.hp > 0 && battle.distance >= 10 && battle.wall.z < 0) {
      toldWall = true;
      message('击碎硬墙，或向左避开', 3.0);
    }
    if (battle.wall.hp <= 0 && tip.textContent === '击碎硬墙，或向左避开') tip.hidden = true;
    if (!bossBar.hidden && !toldBoss) {
      toldBoss = true;
      message('对准 Boss 开火，跳起时避开落点', 2.2);
    }
    if (b.defeated && !toldClear && b.defeatAge >= 0.92) {
      toldClear = true;
      message('Boss 已倒下，清理剩余红兵', 2.3);
    }
    if (battle.hint && battle.hint.id !== lastHint) {
      lastHint = battle.hint.id;
      message(battle.hint.text, 2.1);
    }
    if (!tip.hidden && battle.elapsed >= tipUntil) tip.hidden = true;
  }
  if (!battle.playing && battle.phase !== 'ready') {
    tip.hidden = true;
    $('pause').hidden = true;
    if (battle.resultReady && !panel) showPanel('result');
  }
}
function loop(now) {
  requestAnimationFrame(loop);
  if (document.hidden) return;
  if (panel && !needsPaint) {
    last = now;
    return;
  }
  if (!panel && battle.phase === 'ready' && last && now - last < 1000 / 29 && !needsPaint) return;
  needsPaint = false;
  const real = last ? (now - last) / 1000 : 1 / 60;
  last = now;
  const dt = Math.min(0.08, Math.max(0, real));
  let advance = 0;
  if (!panel) {
    visualTime += dt;
    if (battle.playing || battle.phase === 'won' || battle.phase === 'lost') {
      accumulator += dt;
      while (accumulator >= 1 / 60) {
        const ax = Number(right.some((k) => keys.has(k))) - Number(left.some((k) => keys.has(k)));
        const az = Number(down.some((k) => keys.has(k))) - Number(up.some((k) => keys.has(k)));
        battle.tick(1 / 60, ax, az);
        advance += battle.worldAdvance;
        accumulator -= 1 / 60;
      }
    }
    if (battle.playing) {
      frameWindow += dt;
      if (real > 0.031) lowerFrames++;
      if (frameWindow > 2.1) {
        if (lowerFrames > 24) view.lowerResolution();
        lowerFrames = 0;
        frameWindow = 0;
      }
    }
  }
  view.draw(battle, visualTime, panel ? 0 : dt, advance, mode);
  hud();
}
function fail(text) {
  const p = $('problem');
  p.hidden = false;
  p.textContent = text;
  const b = document.createElement('button');
  b.textContent = '重新载入';
  b.onclick = () => location.reload();
  p.append(b);
}
async function boot() {
  try {
    view = makeView(canvas, stage);
    view.reset(battle.x);
    const resize = () => {
      view.resize();
      battle.entryZ = view.entryZ();
      needsPaint = true;
    };
    resize();
    new ResizeObserver(resize).observe(stage);
    window.addEventListener('resize', resize);
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      background();
      fail('图形上下文已中断，请重新载入游戏。');
    });
    hasSprites = await view.assets;
    await view.prepareBoss(battle.boss.kind);
    chooseArt(mode, false);
    ready = true;
    stage.dataset.phase = 'ready';
    startButton.disabled = false;
    startButton.lastElementChild.textContent = '开始出击';
    requestAnimationFrame(loop);
  } catch (error) {
    console.error(error);
    fail('游戏需要支持 WebGL 2 的浏览器，请在 Safari 或 Chrome 中打开。');
  }
}
boot();
