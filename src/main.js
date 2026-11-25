import { Battle } from './battle.js';
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
  hybrid: '随队小兵和冲锋红兵用 AI 角色图，队长、Boss 和密集兵阵用 3D。',
  ai: '队长和小兵使用 AI 角色图，Boss 使用原画建模。',
  '3d': '所有角色都使用 3D 模型，可看清跑动、炮身后坐和双拳砸地。',
};
const coarse = matchMedia('(pointer:coarse)').matches;
$('instruction').textContent = coarse ? '左右拖动 · 自动开火' : '← → 或 A / D 移动 · 自动开火';
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
  audio.play(e.kind, e.strength);
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
function restart() {
  release();
  battle.reset();
  view.reset(battle.x);
  accumulator = 0;
  visualTime = 0;
  tip.hidden = true;
  toldWall = false;
  toldBoss = false;
  start();
}
function showPanel(which) {
  if (!ready) return;
  release();
  accumulator = 0;
  panel = which;
  needsPaint = true;
  dlg.hidden = false;
  $('options').hidden = which !== 'art';
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
    $('detail').textContent = '';
    $('continue').textContent = '继续游戏';
  }
  if (which === 'result') {
    const win = battle.phase === 'won';
    $('dialogTitle').textContent = win ? '突破成功' : ['wall', 'slam'].includes(battle.lossReason) ? '队长出局' : battle.lossReason === 'breach' ? '防线失守' : '小队全灭';
    $('detail').textContent = win
      ? `击败 Boss，击退 ${battle.score} 名红兵。`
      : battle.lossReason==='wall' ? '队长被硬墙推出了跑道。' : battle.lossReason==='breach' ? 'Boss 突破了防线。' : battle.lossReason==='slam' ? '队长被 Boss 的落地冲击击倒。' : battle.boss.active
        ? `Boss 还剩 ${Math.ceil(battle.boss.hp)} / 800 生命`
        : '红兵突破了队伍。';
    $('continue').textContent = '再玩一次';
  }
  $('continue').focus({ preventScroll: true });
}
function hidePanel() {
  needsPaint = true;
  panel = null;
  returnPanel = null;
  dlg.hidden = true;
  accumulator = 0;
}
function resume() {
  const old = panel,
    prev = returnPanel;
  hidePanel();
  if (old === 'result') {
    restart();
    return;
  }
  if (old === 'art' && prev) {
    showPanel(prev);
    return;
  }
  if (battle.playing) {
    audio.unlock();
  } else if (battle.phase === 'ready') startButton.focus({ preventScroll: true });
}
$('continue').addEventListener('click', resume);
$('secondary').addEventListener('click', restart);
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
  activePointer = { id: e.pointerId, start: e.clientX, world: battle.targetX };
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove', (e) => {
  if (!activePointer || e.pointerId !== activePointer.id || panel) return;
  battle.aim(activePointer.world + ((e.clientX - activePointer.start) * 14.8) / stage.clientWidth);
});
function endPointer(e) {
  if (e.pointerId === activePointer?.id) activePointer = null;
}
for (const name of ['pointerup', 'pointercancel', 'lostpointercapture'])
  canvas.addEventListener(name, endPointer);
const left = ['ArrowLeft', 'KeyA'],
  right = ['ArrowRight', 'KeyD'];
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
  if (left.includes(k) || right.includes(k)) {
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
  lastHP = -1;
function hud() {
  const n = battle.allies.length,
    power = Math.round(26 + Math.min(174, battle.absorbed * 4.85));
  if (n !== lastCount) {
    $('count').textContent = n;
    lastCount = n;
  }
  if (power !== lastPower) {
    $('power').textContent = power;
    lastPower = power;
  }
  stage.dataset.phase = battle.phase;
  const b = battle.boss;
  bossBar.hidden = !b.active || battle.phase === 'won';
  if (!bossBar.hidden) {
    const p = view.project(b.x, 4.91 + b.lift * 1.38, b.z);
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
    if (b.active && !toldBoss) {
      toldBoss = true;
      message('对准 Boss 开火，跳起时避开落点', 2.2);
    }
    if (!tip.hidden && battle.elapsed >= tipUntil) tip.hidden = true;
  }
  if (!battle.playing && battle.phase !== 'ready') {
    tip.hidden = true;
    $('pause').hidden = true;
    if (battle.endTime > (battle.phase==="won"?2.05:.86) && !panel) showPanel('result');
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
        battle.tick(1 / 60, ax);
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
      needsPaint = true;
    };
    new ResizeObserver(resize).observe(stage);
    window.addEventListener('resize', resize);
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      background();
      fail('图形上下文已中断，请重新载入游戏。');
    });
    hasSprites = await view.assets;
    chooseArt(mode, false);
    ready = true;
    stage.dataset.phase = 'ready';
    startButton.disabled = false;
    startButton.lastElementChild.textContent = '开始游戏';
    requestAnimationFrame(loop);
  } catch (error) {
    console.error(error);
    fail('游戏需要支持 WebGL 2 的浏览器，请在 Safari 或 Chrome 中打开。');
  }
}
boot();
