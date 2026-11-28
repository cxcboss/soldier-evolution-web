import { Battle } from './battle.js';
import { supplies, lastStage } from './supplies.js';
import { campaign } from './campaign.js';
import { bosses } from './boss-skills.js';
import { creatureCrowns } from './creature-bosses.js';
import { squadSummary } from './units.js';
import { makeView } from './view.js';
import { createAudio } from './audio.js';
import {
  ARMORY_UPGRADES,
  buyUpgrade,
  computeBonuses,
  evaluateRun,
  loadProgress,
  saveProgress,
  totalStars,
} from './progression.js';

const $ = (id) => document.getElementById(id);
const stage = $('stage'),
  canvas = $('game'),
  startPanel = $('start'),
  startButton = $('startButton');
const dlg = $('veil'),
  bossBar = $('bossbar'),
  bossHud = $('bossHud'),
  bossAlert = $('bossAlert'),
  squadRoster = $('squadRoster'),
  comboBox = $('comboBox'),
  overdriveBtn = $('overdriveBtn'),
  screenFx = $('screenFx'),
  tip = $('tip');

const artNames = { hybrid: '混合', ai: '原画', '3d': '纯 3D' };
const artDescriptions = {
  hybrid: '合成重炮队长、钢铁指挥官与 Boss 全部 3D 精雕，士兵叠加 3D 专属装备与原画质感。',
  ai: '所有兵种使用动态原画与流光特效。',
  '3d': '全员纯 3D 模型，可近距离检视分明步态、3D 兵种装备、高举连砸与击退倒地。',
};
const coarse = matchMedia('(pointer:coarse)').matches;
$('instruction').textContent = coarse
  ? '左右拖动 · 吃金门合兵进阶 · 满能点超载齐射'
  : 'WASD / 方向键移动 · 吃金门合兵进阶 · 空格/E 键超载';

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

const progress = loadProgress();
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
  hitstop = 0,
  lowerFrames = 0,
  frameWindow = 0,
  tipUntil = 0,
  bossAlertUntil = 0,
  toldWall = false,
  toldBoss = false,
  toldClear = false,
  lastHint = 0,
  resultEvaluated = false,
  activePointer = null;

// 缓存视口与 HUD 布局尺寸，避免 60fps 每帧读写 DOM 触发回流
let cachedStageW = 390;
let cachedStageH = 844;
let cachedHudTop = 66;

function updateLayoutMetrics() {
  cachedStageW = stage.clientWidth || 390;
  cachedStageH = stage.clientHeight || 844;
  const toolbar = $('level')?.closest('.hud');
  cachedHudTop = toolbar ? toolbar.offsetTop + toolbar.offsetHeight + 22 : 66;
}

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

// 零 GC 飘浮战斗文字对象池（预分配 24 个 DOM 节点复用）
const POPUP_CAP = 24;
const popupPool = Array.from({ length: POPUP_CAP }, () => {
  const el = document.createElement('span');
  el.className = 'popup';
  el.hidden = true;
  $('popups').append(el);
  return { el, active: false, x: 0, y: 0, age: 0, life: 0.72, vx: 0, vy: 0 };
});
let popupCursor = 0;

function spawnPopup(item) {
  if (!view) return;
  const p = view.project(item.x, item.y, item.z);
  if (p.x < -40 || p.x > cachedStageW + 40 || p.y < 10 || p.y > cachedStageH) return;
  const slot = popupPool[popupCursor++ % POPUP_CAP];
  slot.active = true;
  slot.x = p.x;
  slot.y = p.y;
  slot.age = 0;
  slot.life = item.kind === 'evolve' ? 1.25 : item.kind === 'crit' ? 0.8 : 0.64;
  slot.vx = (Math.random() - 0.5) * 26;
  slot.vy = item.kind === 'evolve' ? -54 : -64;
  slot.el.dataset.kind = item.kind || 'rocket';
  slot.el.textContent = item.text;
  slot.el.hidden = false;
  slot.el.style.opacity = '1';
  slot.el.style.transform = `translate3d(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px,0) translate(-50%,-50%) scale(1.18)`;
}

function updatePopups(dt) {
  for (let i = 0; i < POPUP_CAP; i++) {
    const slot = popupPool[i];
    if (!slot.active) continue;
    slot.age += dt;
    const t = slot.age / slot.life;
    if (t >= 1) {
      slot.active = false;
      slot.el.hidden = true;
      continue;
    }
    slot.x += slot.vx * dt;
    slot.y += slot.vy * dt;
    slot.vy *= Math.exp(-3.6 * dt);
    const scale = t < 0.16 ? 1.26 - t : 1.0 - t * 0.16;
    const alpha = t < 0.6 ? 1 : 1 - (t - 0.6) / 0.4;
    slot.el.style.opacity = alpha.toFixed(2);
    slot.el.style.transform = `translate3d(${slot.x.toFixed(1)}px,${slot.y.toFixed(1)}px,0) translate(-50%,-50%) scale(${scale.toFixed(2)})`;
  }
}

function clearPopups() {
  for (const slot of popupPool) {
    slot.active = false;
    slot.el.hidden = true;
  }
}

const battle = new Battle((e) => {
  if (e.kind !== 'smallShot' && e.kind !== 'loss') view?.feedback(e);
  audio.play(e.kind, e.strength, e.supply);
  // 关键高光瞬间注入极短暂顿帧，凸显爆破与合兵重量感
  if (
    e.kind === 'overdrive' ||
    e.kind === 'bossBurst' ||
    e.kind === 'finisher' ||
    e.kind === 'barrelBlast'
  ) {
    hitstop = Math.max(hitstop, 0.045);
  } else if (e.kind === 'wallBreak' || e.kind === 'evolve' || e.kind === 'bossEnrage') {
    hitstop = Math.max(hitstop, 0.032);
  }
});

const requestedStage = Number(new URL(location.href).searchParams.get('stage'));
if (Number.isInteger(requestedStage) && requestedStage >= 1 && requestedStage <= lastStage)
  battle.reset(requestedStage);
battle.applyBonuses(computeBonuses(progress));

// === 构建首页三关直选战术卡片 + 战役弹窗卡片 ===
const homeStageButtons = new Map();
const modalStageStarEls = new Map();
const homeStageStarEls = new Map();

for (const route of campaign) {
  // 1. 首页横向三关直选卡
  const card = document.createElement('button');
  card.className = 'stage-card';
  card.type = 'button';
  card.role = 'radio';
  card.dataset.level = String(route.number);
  card.dataset.theme = route.theme;
  const head = document.createElement('div');
  head.className = 'stage-card-head';
  const num = document.createElement('span');
  num.className = 'stage-card-num';
  num.textContent = String(route.number).padStart(2, '0');
  const starsEl = document.createElement('span');
  starsEl.className = 'stage-card-stars';
  homeStageStarEls.set(route.number, starsEl);
  head.append(num, starsEl);
  const title = document.createElement('strong');
  title.className = 'stage-card-title';
  title.textContent = route.chapter.name;
  const sub = document.createElement('span');
  sub.className = 'stage-card-sub';
  sub.textContent = route.badge;
  card.append(head, title, sub);
  card.addEventListener('click', () => selectHomeStage(route.number));
  $('homeStages').append(card);
  homeStageButtons.set(route.number, card);

  // 2. 战役弹窗大幅关卡卡片
  const modalCard = document.createElement('button');
  modalCard.className = 'campaign-card';
  modalCard.dataset.level = String(route.number);
  modalCard.dataset.theme = route.theme;
  const mNum = document.createElement('b');
  mNum.className = 'campaign-num';
  mNum.textContent = String(route.number).padStart(2, '0');
  const info = document.createElement('div');
  info.className = 'campaign-info';
  const mHead = document.createElement('header');
  const mChap = document.createElement('small');
  mChap.textContent = `${route.chapter.name} · ${route.badge}`;
  const mStars = document.createElement('span');
  mStars.className = 'stage-stars';
  modalStageStarEls.set(route.number, mStars);
  mHead.append(mChap, mStars);
  const mTitle = document.createElement('h3');
  mTitle.textContent = route.name;
  const mDesc = document.createElement('p');
  mDesc.textContent = route.tagline;
  info.append(mHead, mTitle, mDesc);
  modalCard.append(mNum, info);
  modalCard.addEventListener('click', () => restart(route.number));
  $('stageList').append(modalCard);
}

function selectHomeStage(level) {
  if (battle.phase !== 'ready') {
    restart(level);
    return;
  }
  battle.reset(level);
  battle.applyBonuses(computeBonuses(progress));
  refreshHomeMeta();
  view?.reset(battle.x);
  view?.prepareBoss(battle.boss.kind).then(() => {
    needsPaint = true;
  });
  needsPaint = true;
  const address = new URL(location.href);
  address.searchParams.set('stage', battle.stage);
  history.replaceState(null, '', address);
}

function refreshHomeMeta() {
  $('missionBadge').textContent = battle.route.badge || '精品关卡';
  $('missionName').textContent = battle.route.name;
  $('missionTagline').textContent = battle.route.tagline || '';
  $('homeStars').textContent = `${totalStars(progress)} / ${lastStage * 3}`;
  $('homeCoins').textContent = String(progress.coins);
  for (const [num, btn] of homeStageButtons.entries()) {
    btn.setAttribute('aria-checked', String(num === battle.stage));
  }
}

function refreshStageStars() {
  for (const route of campaign) {
    const s = progress.stars[String(route.number)] || 0;
    const text = '★'.repeat(s) + '☆'.repeat(3 - s);
    homeStageStarEls.get(route.number).textContent = text;
    modalStageStarEls.get(route.number).textContent = text;
  }
}
refreshStageStars();
refreshHomeMeta();

function renderArmory() {
  $('armoryCoins').textContent = String(progress.coins);
  const list = $('armoryList');
  list.textContent = '';
  for (const item of ARMORY_UPGRADES) {
    const lv = progress.upgrades[item.id] || 0;
    const maxed = lv >= item.maxLevel;
    const cost = maxed ? 0 : item.costs[lv];
    const row = document.createElement('div');
    row.className = 'armory-item';
    const info = document.createElement('div');
    info.className = 'armory-info';
    const h4 = document.createElement('h4');
    h4.textContent = item.name;
    const tag = document.createElement('span');
    tag.textContent = `Lv.${lv}/${item.maxLevel} · ${item.format(lv)}`;
    h4.append(tag);
    const p = document.createElement('p');
    p.textContent = maxed ? `${item.desc}（已满级）` : `${item.desc} → ${item.nextText(lv)}`;
    info.append(h4, p);

    const btn = document.createElement('button');
    btn.className = 'armory-buy';
    btn.disabled = maxed || progress.coins < cost;
    btn.textContent = maxed ? '已满级' : `${cost} 军饷`;
    btn.addEventListener('click', () => {
      if (!buyUpgrade(progress, item.id)) return;
      saveProgress(progress);
      audio.unlock();
      audio.play('buy', 1);
      renderArmory();
      refreshHomeMeta();
      if (battle.phase === 'ready') {
        battle.reset(battle.stage);
        battle.applyBonuses(computeBonuses(progress));
        needsPaint = true;
      }
    });
    row.append(info, btn);
    list.append(row);
  }
}

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
  updateLayoutMetrics();
}
function restart(level = battle.stage) {
  release();
  clearPopups();
  battle.reset(level);
  battle.applyBonuses(computeBonuses(progress));
  refreshHomeMeta();
  view.prepareBoss(battle.boss.kind).then(() => {
    needsPaint = true;
  });
  view.reset(battle.x);
  accumulator = 0;
  visualTime = 0;
  hitstop = 0;
  tip.hidden = true;
  bossAlert.hidden = true;
  bossAlertUntil = 0;
  toldWall = false;
  toldBoss = false;
  toldClear = false;
  lastHint = 0;
  resultEvaluated = false;
  lastBuffSig = '';
  lastRosterSig = '';
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
  const panelIcons = {
    art: 'art',
    levels: 'map',
    pause: 'pause',
    won: 'medal',
    lost: 'retreat',
    armory: 'wrench',
  };
  $('dialog').dataset.panel = panelKind;
  $('dialogIcon').setAttribute('href', '#i-' + (panelIcons[panelKind] || 'flag'));
  $('dialogChapter').textContent =
    which === 'levels'
      ? `三关精品远征 · 已收集 ${totalStars(progress)} / ${lastStage * 3} ★`
      : which === 'armory'
        ? '军团永久强化'
        : `第 ${battle.stage} 关 · ${battle.route.chapter.name}`;
  $('resultStats').hidden = which !== 'result';
  $('resultStars').hidden = which !== 'result';
  $('armoryPanel').hidden = which !== 'armory';
  $('options').hidden = which !== 'art';
  $('stageList').hidden = which !== 'levels';
  $('dialog').classList.toggle('levels', which === 'levels');
  $('selectStage').hidden = which !== 'pause' && which !== 'result';
  $('armoryAction').hidden = which !== 'result';
  $('secondary').hidden = which !== 'pause';

  if (which === 'levels') {
    audio.pause();
    refreshStageStars();
    $('dialogTitle').textContent = '选择关卡';
    $('detail').textContent = '三关各有独立机关、地形与 Boss 演出，点选立刻开战。';
    $('continue').textContent = '返回';
    for (const button of $('stageList').querySelectorAll('[data-level]'))
      button.setAttribute('aria-current', String(+button.dataset.level === battle.stage));
  }
  if (which === 'armory') {
    audio.pause();
    renderArmory();
    $('dialogTitle').textContent = '军械整备';
    $('detail').textContent = '消耗远征军饷永久强化小队初始战力与增援规模。';
    $('continue').textContent = '完成整备';
  }
  if (which === 'art') {
    audio.pause();
    $('dialogTitle').textContent = '角色画面';
    $('detail').textContent = artDescriptions[mode];
    $('continue').textContent = '确定';
    chooseArt(mode, false);
  }
  if (which === 'pause') {
    audio.pause();
    $('dialogTitle').textContent = '战术暂停';
    $('detail').textContent = battle.route.name + ' · ' + battle.route.tagline;
    $('continue').textContent = '继续战斗';
  }
  if (which === 'result') {
    const win = battle.phase === 'won';
    $('resultKills').textContent = battle.score;
    $('resultMerges').textContent = battle.mergeCount;
    $('resultCombo').textContent = battle.maxCombo;
    if (!resultEvaluated) {
      resultEvaluated = true;
      const summary = evaluateRun(progress, battle, win);
      saveProgress(progress);
      refreshHomeMeta();
      refreshStageStars();
      const stars = $('starRow').children;
      for (let i = 0; i < 3; i++) {
        stars[i].classList.toggle('lit', i < summary.stars);
      }
      $('resultReward').textContent =
        `+${summary.reward} 军饷` + (summary.firstStarBonus ? ' (首星翻倍)' : '');
    }
    if (win) {
      $('dialogTitle').textContent =
        battle.stage === lastStage ? '三关全制霸!' : `第 ${battle.stage} 关制胜!`;
      $('detail').textContent =
        battle.stage < lastStage
          ? `下一战：${campaign[battle.stage].chapter.name} · ${campaign[battle.stage].name}`
          : '三关精品战役全部通关！可继续冲刺全 9 星与钢铁指挥官！';
    } else {
      const losses = {
        signature: [
          '全军覆没',
          bosses[battle.boss.kind].name + '的' + bosses[battle.boss.kind].skill + '击溃了阵列。',
        ],
        bossShot: ['全军覆没', '队伍被首领弹幕压垮。'],
        gap: ['坠入断桥', '遇到断桥缺口提前换道避开。'],
        infantry: ['防线告破', '红兵冲锋消耗光了护卫与核心大兵。'],
        skyfall: ['陨石砸毁', '注意红圈预警，提前走位闪避陨石！'],
        lava: ['熔岩吞噬', '熔岩裂口蓄力变亮时及时切道避开！'],
        roller: ['滚木碾压', '左右闪避滚木，或集火轰碎它获取 +3 援兵！'],
        wall: ['推下桥面', '被装甲硬墙推到了跑道边缘。'],
        breach: ['防线失守', 'Boss 突破了桥面防线。'],
        slam: ['重拳砸溃', 'Boss 连续举手砸地时注意避开地面红圈！'],
      };
      const fallback =
        battle.boss.active && !battle.boss.defeated
          ? `首领剩余 ${Math.ceil(battle.boss.hp)} / ${battle.boss.maxHp} 生命`
          : '小队阵亡，多吃金门合成大兵再战！';
      const [title, detail] = losses[battle.lossReason] || ['战斗失利', fallback];
      $('dialogTitle').textContent = title;
      $('detail').textContent = detail;
    }
    $('continue').textContent = win && battle.stage < lastStage ? '征战下一关' : '再次挑战';
  }
  if (which === 'levels') {
    const current = $('stageList').querySelector('[aria-current=true]');
    current?.focus({ preventScroll: true });
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
  if ((old === 'art' || old === 'levels' || old === 'armory') && prev) {
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

function openArmory() {
  if (!ready) return;
  returnPanel = panel;
  showPanel('armory');
}

$('level').addEventListener('click', chooseLevel);
$('selectStage').addEventListener('click', chooseLevel);
$('openArmory').addEventListener('click', openArmory);
$('armoryAction').addEventListener('click', openArmory);
$('continue').addEventListener('click', resume);
$('secondary').addEventListener('click', () => restart());
startButton.addEventListener('click', start);

overdriveBtn.addEventListener('pointerdown', (e) => {
  e.stopPropagation();
  if (!battle.playing || panel) return;
  audio.unlock();
  battle.triggerOverdrive();
});

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
    battle.targetX + ((e.clientX - activePointer.x) * 14.8) / cachedStageW,
    battle.targetZ + ((e.clientY - activePointer.y) * 11) / cachedStageH,
  );
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
    (k === 'KeyE' || k === 'Space' || k === 'ShiftLeft' || k === 'ShiftRight') &&
    battle.playing &&
    !(k === 'Space' && e.target instanceof HTMLButtonElement)
  ) {
    if (battle.overdrive >= 100) {
      e.preventDefault();
      audio.unlock();
      battle.triggerOverdrive();
    }
  } else if ((k === 'KeyP' || k === 'Escape') && battle.playing) {
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
  lastMaxHP = -1,
  lastBarWidth = -1,
  lastRosterSig = '',
  lastCombo = -1,
  lastOdPct = -1,
  lastOdState = '',
  lastScreenFx = '',
  lastBuffSig = '',
  entrySide = 1,
  taggedBoss = null,
  lastProgress = -1;

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const OD_CIRCUMFERENCE = 2 * Math.PI * 27;

function updateStat(id, current, previous) {
  if (current === previous) return;
  const value = $(id);
  value.textContent = current;
  if (!battle.playing || previous < 0 || reducedMotion.matches || !value.animate) return;
  for (const animation of value.getAnimations()) animation.cancel();
  value.animate(
    [
      { transform: 'scale(1.22)', color: current > previous ? '#ffe366' : '#ff937d' },
      { transform: 'scale(1)', color: '#ffffff' },
    ],
    { duration: 220, easing: 'ease-out' },
  );
}

function hud() {
  if (battle.popups.length) {
    for (let i = 0; i < battle.popups.length; i++) spawnPopup(battle.popups[i]);
    battle.popups.length = 0;
  }

  const sum = squadSummary(battle.squad);
  const n = sum.total,
    power = battle.cannonDamage;
  const level = $('level');
  const levelText = '第 ' + battle.stage + ' 关';
  if ($('levelText').textContent !== levelText) $('levelText').textContent = levelText;
  const prog = Math.min(100, Math.floor((100 * battle.row) / battle.finaleRow));
  if (prog !== lastProgress) {
    $('progress').firstElementChild.style.transform = 'scaleX(' + prog / 100 + ')';
    $('progress').setAttribute('aria-valuenow', String(prog));
    lastProgress = prog;
  }
  level.title = battle.route.name + ' · 切换关卡';

  const showPlayHud = battle.playing;
  const b = battle.boss;
  const bossVisible = b.active && !b.defeated && view.project(b.x, 0, b.z).y >= 4;

  // 实时兵种编成胶囊条（Boss 血条占顶中时让位避免重叠）
  squadRoster.hidden = !showPlayHud || bossVisible;
  if (showPlayHud && !bossVisible) {
    const topTier = battle.highestUnitTier;
    const sig = `${topTier}:${sum.t1}:${sum.t2}:${sum.t3}:${sum.t4}`;
    if (sig !== lastRosterSig) {
      const upgraded = lastRosterSig && topTier > Number(lastRosterSig.split(':')[0]);
      lastRosterSig = sig;
      squadRoster.dataset.tier = String(topTier);
      $('evoLevel').textContent = `T${topTier}`;
      $('rosterT1').textContent = String(sum.t1);
      $('chipT2').hidden = sum.t2 === 0;
      $('rosterT2').textContent = String(sum.t2);
      $('chipT3').hidden = sum.t3 === 0;
      $('rosterT3').textContent = String(sum.t3);
      $('chipT4').hidden = sum.t4 === 0;
      $('rosterT4').textContent = String(sum.t4);
      if (upgraded && !reducedMotion.matches && squadRoster.animate) {
        squadRoster.animate(
          [{ transform: 'scale(1.18)' }, { transform: 'scale(1)' }],
          { duration: 280, easing: 'ease-out' },
        );
      }
    }
  }

  // Buff 芯片组
  const chips = [];
  if (battle.overdriveActive > 0)
    chips.push(['超载超频', Math.ceil(battle.overdriveActive) + 's', 'gold']);
  for (const [key, time] of Object.entries(battle.buffs)) {
    if (time > 0 && supplies[key]) {
      const info = supplies[key];
      chips.push([info.label, Math.ceil(time) + 's', key === 'frost' ? 'ice' : info.tone]);
    }
  }
  if (battle.planks) chips.push(['便桥', '×' + battle.planks, 'gold']);
  if (battle.chill > 0) chips.push(['霜冻减速', Math.ceil(battle.chill) + 's', 'ice']);
  const buffSig = showPlayHud ? chips.map((c) => c.join(':')).join('|') : '';
  if (buffSig !== lastBuffSig) {
    lastBuffSig = buffSig;
    const container = $('buffs');
    container.hidden = !buffSig;
    container.textContent = '';
    for (const [name, val, tone] of chips) {
      const chip = document.createElement('span');
      chip.className = 'buff-chip';
      chip.dataset.tone = tone;
      const small = document.createElement('small');
      small.textContent = val;
      chip.append(name, small);
      container.append(chip);
    }
  }

  // 右侧街机连击倍率牌
  const showCombo = showPlayHud && battle.combo >= 3;
  comboBox.hidden = !showCombo;
  if (showCombo) {
    if (battle.combo !== lastCombo) {
      lastCombo = battle.combo;
      $('comboCount').textContent = String(battle.combo);
      $('comboMult').textContent = `×${battle.comboDamageMult.toFixed(2)} 火力`;
      comboBox.dataset.hot =
        battle.combo >= 80 ? '3' : battle.combo >= 40 ? '2' : battle.combo >= 15 ? '1' : '0';
      if (!reducedMotion.matches && comboBox.animate) {
        comboBox.animate(
          [{ transform: 'scale(1.16)' }, { transform: 'scale(1)' }],
          { duration: 150, easing: 'ease-out' },
        );
      }
    }
    $('comboFill').style.transform = `scaleX(${Math.max(0, Math.min(1, battle.comboTimer / 3.4)).toFixed(3)})`;
  }

  // 右下角「战术超载」单手大招按钮
  overdriveBtn.hidden = !showPlayHud;
  if (showPlayHud) {
    const active = battle.overdriveActive > 0;
    const pct = active
      ? Math.round((battle.overdriveActive / 4.4) * 100)
      : Math.floor(battle.overdrive);
    const readyOd = !active && battle.overdrive >= 100;
    const odState = active ? 'active' : readyOd ? 'ready' : 'charge';
    if (odState !== lastOdState) {
      lastOdState = odState;
      overdriveBtn.dataset.ready = String(readyOd);
      overdriveBtn.dataset.active = String(active);
    }
    if (pct !== lastOdPct || odState !== lastOdState) {
      lastOdPct = pct;
      $('odArc').style.strokeDashoffset = (OD_CIRCUMFERENCE * (1 - pct / 100)).toFixed(1);
      $('odLabel').textContent = active ? '超载中' : readyOd ? '齐射!' : pct + '%';
    }
  }

  // 全屏边缘光效
  const fx = !showPlayHud
    ? ''
    : battle.hurt > 0.25
      ? 'hurt'
      : battle.overdriveActive > 0 || battle.buffs.fever > 0
        ? 'overdrive'
        : battle.chill > 0
          ? 'chill'
          : '';
  if (fx !== lastScreenFx) {
    lastScreenFx = fx;
    if (fx) screenFx.dataset.fx = fx;
    else delete screenFx.dataset.fx;
  }

  updateStat('count', n, lastCount);
  updateStat('power', power, lastPower);
  lastCount = n;
  lastPower = power;
  stage.dataset.phase = battle.phase;

  bossBar.hidden = !bossVisible;
  bossHud.hidden = !bossVisible;
  if (bossVisible) {
    const definition = bosses[b.kind];
    const [height, offset] = definition.crown;
    const depth = b.z + offset * Math.cos(b.yaw);
    const crown = view.project(b.x, height + b.lift, depth);
    if (mode !== 'ai' && creatureCrowns[b.kind]) {
      crown.y = Infinity;
      for (const [peak, localZ, span] of creatureCrowns[b.kind]) {
        const z = b.z + localZ * Math.cos(b.yaw) - span * Math.abs(Math.sin(b.yaw));
        crown.y = Math.min(crown.y, view.project(b.x, peak + b.lift, z).y - 9);
      }
    }
    const unit = view.project(b.x + 1, height + b.lift, depth).x - crown.x;
    const width = Math.round(Math.min(cachedStageW * 0.28, 114, Math.max(66, unit * 2.55)));
    if (lastBarWidth !== width) {
      bossBar.style.setProperty('--hp-width', width + 'px');
      lastBarWidth = width;
    }
    if ($('bossName').textContent !== definition.name) {
      $('bossName').textContent = definition.name;
      $('bossHudName').textContent = definition.name;
      $('bossHudSkill').textContent = definition.skill;
    }
    $('bossHudRage').hidden = !b.enraged;

    const top = cachedHudTop + 48;
    const sideAmount = 1 - Math.min(1, Math.max(0, (crown.y + 4 - top) / 27));
    if (taggedBoss !== b) {
      entrySide = crown.x < cachedStageW / 2 ? 1 : -1;
      taggedBoss = b;
    }
    const extent = width / 2 + 6;
    const x = Math.max(
      extent,
      Math.min(cachedStageW - extent, crown.x + entrySide * sideAmount * (width / 2 + unit * 1.7)),
    );
    const y = Math.max(top, crown.y + 4);
    bossBar.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translate(-50%, -100%)`;
    const hp = Math.ceil(b.hp);
    if (hp !== lastHP || b.maxHp !== lastMaxHP) {
      const ratio = Math.max(0, b.hp / b.maxHp);
      bossBar.firstElementChild.style.transform = `scaleX(${ratio})`;
      bossBar.lastElementChild.textContent = hp;
      bossBar.setAttribute('aria-valuenow', String(hp));
      bossBar.setAttribute('aria-valuemax', String(b.maxHp));
      $('bossHudFill').style.transform = `scaleX(${ratio})`;
      $('bossHudHp').textContent = `${hp} / ${b.maxHp}`;
      lastHP = hp;
      lastMaxHP = b.maxHp;
    }
  }

  if (battle.playing && !panel) {
    if (!toldWall && battle.wall.hp > 0 && battle.distance >= 10 && battle.wall.z < 0) {
      toldWall = true;
      message('打碎硬墙抢夺进化补给，或向左避开！', 2.8);
    }
    if (battle.wall.hp <= 0 && tip.textContent === '打碎硬墙抢夺进化补给，或向左避开！')
      tip.hidden = true;
    if (bossVisible && !toldBoss) {
      toldBoss = true;
      $('bossAlertName').textContent = `${bosses[b.kind].name} · ${bosses[b.kind].skill}`;
      bossAlert.hidden = false;
      bossAlertUntil = battle.elapsed + 1.9;
      message(bosses[b.kind].name + '来袭！小心连续高举砸地红圈', 2.4);
    }
    if (!bossAlert.hidden && battle.elapsed >= bossAlertUntil) bossAlert.hidden = true;
    if (b.defeated && !toldClear && b.defeatAge >= 1.38) {
      toldClear = true;
      message('首领已被击退击倒！清扫残敌夺取胜利', 2.3);
    }
    if (battle.hint && battle.hint.id !== lastHint) {
      lastHint = battle.hint.id;
      message(battle.hint.text, 2.2);
    }
    if (!tip.hidden && battle.elapsed >= tipUntil) tip.hidden = true;
  }
  if (!battle.playing && battle.phase !== 'ready') {
    tip.hidden = true;
    bossAlert.hidden = true;
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
    if (hitstop > 0) {
      hitstop = Math.max(0, hitstop - dt);
      updatePopups(dt * 0.45);
      view.draw(battle, visualTime, 0, 0, mode);
      hud();
      return;
    }
    visualTime += dt;
    updatePopups(dt);
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
      updateLayoutMetrics();
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
    const [loadedSprites] = await Promise.all([view.assets, view.prepareBoss(battle.boss.kind)]);
    hasSprites = loadedSprites;
    chooseArt(mode, false);
    ready = true;
    stage.dataset.phase = 'ready';
    startButton.disabled = false;
    startButton.lastElementChild.textContent = '立刻出击';
    requestAnimationFrame(loop);
  } catch (error) {
    console.error(error);
    fail('游戏需要支持 WebGL 2 的浏览器，请在 Safari 或 Chrome 中打开。');
  }
}
boot();
