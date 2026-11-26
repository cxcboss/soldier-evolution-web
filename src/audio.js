const SAMPLE_RATE = 24000;
const TAU = Math.PI * 2;
const cues = {
  muzzle: { duration: 0.25, gain: 0.33, interval: 0.18 },
  smallShot: { duration: 0.08, gain: 0.076, interval: 0.105 },
  impact: { duration: 0.31, gain: 0.28, interval: 0.12 },
  wallHit: { duration: 0.16, gain: 0.16, interval: 0.13 },
  cardHit: { duration: 0.1, gain: 0.11, interval: 0.13 },
  supplyBreak: { duration: 0.25, gain: 0.21, interval: 0.1 },
  shieldHit: { duration: 0.16, gain: 0.14, interval: 0.14 },
  wallBreak: { duration: 0.43, gain: 0.35, interval: 0.4 },
  plus: { duration: 0.22, gain: 0.18, interval: 0.105 },
  longRange: { duration: 0.44, gain: 0.25, interval: 0.18 },
  guardUp: { duration: 0.38, gain: 0.22, interval: 0.18 },
  merge: { duration: 0.41, gain: 0.23, interval: 0.18 },
  slam: { duration: 0.49, gain: 0.42, interval: 0.5 },
  bruiserStrike: { duration: 0.31, gain: 0.28, interval: 0.22 },
  diverStrike: { duration: 0.36, gain: 0.22, interval: 0.1 },
  wardenCast: { duration: 0.68, gain: 0.26, interval: 0.5 },
  drillStrike: { duration: 0.32, gain: 0.21, interval: 0.18 },
  kestrelCast: { duration: 0.66, gain: 0.23, interval: 0.42 },
  engineStrike: { duration: 0.44, gain: 0.3, interval: 0.24 },
  bossBurst: { duration: 0.79, gain: 0.4, interval: 0.7 },
  glassBreak: { duration: 0.39, gain: 0.24, interval: 0.17 },
  crateBreak: { duration: 0.32, gain: 0.24, interval: 0.2 },
  latchHit: { duration: 0.16, gain: 0.16, interval: 0.1 },
  rally: { duration: 0.9, gain: 0.28, interval: 1 },
  chainSnap: { duration: 0.29, gain: 0.28, interval: 0.23 },
  discharge: { duration: 0.41, gain: 0.26, interval: 0.23 },
  vaultLand: { duration: 0.25, gain: 0.21, interval: 0.4 },
  victory: { duration: 0.79, gain: 0.28, interval: 0.7 },
  loss: { duration: 0.63, gain: 0.25, interval: 0.57 },
  hit: { duration: 0.09, gain: 0.075, interval: 0.14 },
};

// Render each miniature sound once. A volley subsequently starts a single buffered voice.
function buildSound(context, kind) {
  const buffer = context.createBuffer(1, Math.ceil(cues[kind].duration * SAMPLE_RATE), SAMPLE_RATE);
  const samples = buffer.getChannelData(0);
  let seed = 981273;
  function layer(start, duration, value) {
    const offset = Math.floor(start * SAMPLE_RATE);
    const end = Math.min(samples.length, offset + Math.ceil(duration * SAMPLE_RATE));
    const attack = Math.min(0.005, duration * 0.1);
    const release = Math.min(0.012, duration * 0.16);
    for (let i = offset; i < end; i++) {
      const t = (i - offset) / SAMPLE_RATE;
      const envelope =
        Math.min(1, t / attack, (duration - t) / release) * Math.exp((-3.35 * t) / duration);
      samples[i] += value(t / duration) * envelope;
    }
  }
  function tone(start, duration, fromHz, toHz, level, overtones = 0.12) {
    let phase = 0;
    layer(start, duration, (progress) => {
      const pitch = toHz + (fromHz - toHz) * (1 - progress) ** 3;
      phase += (TAU * pitch) / SAMPLE_RATE;
      return level * (Math.sin(phase) + overtones * Math.sin(2 * phase + 0.15));
    });
  }
  function noise(start, duration, cutoffHz, level) {
    let low = 0,
      rumble = 0;
    const rate = 1 - Math.exp((-TAU * cutoffHz) / SAMPLE_RATE);
    layer(start, duration, () => {
      seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
      low += rate * (seed / 2147483648 - 1 - low);
      rumble += 0.014 * (low - rumble);
      return level * (low - rumble * 0.65);
    });
  }
  function bell(start, duration, hz, level) {
    tone(start, duration, hz * 1.013, hz, level, 0.16);
    tone(start, duration * 0.35, hz * 2.52, hz * 2.5, level * 0.11);
  }
  switch (kind) {
    case 'cardHit':
      bell(0, 0.09, 1150, 0.42);
      break;
    case 'supplyBreak':
      noise(0, 0.068, 4200, 0.51);
      bell(0.015, 0.18, 906, 0.44);
      bell(0.07, 0.16, 1326, 0.36);
      break;
    case 'shieldHit':
      tone(0, 0.15, 740, 365, 0.56, 0.18);
      break;
    case 'muzzle':
      tone(0, 0.2, 213, 61, 0.76, 0.48);
      noise(0, 0.093, 2400, 0.64);
      noise(0.023, 0.212, 580, 0.57);
      break;
    case 'smallShot':
      tone(0, 0.054, 1550, 580, 0.33, 0.1);
      noise(0, 0.042, 3600, 0.56);
      break;
    case 'impact':
      tone(0, 0.23, 115, 49, 0.63, 0.52);
      noise(0.004, 0.25, 1050, 0.89);
      noise(0.044, 0.23, 370, 0.47);
      break;
    case 'wallHit':
      noise(0, 0.045, 3100, 0.56);
      tone(0, 0.124, 650, 440, 0.36);
      tone(0.008, 0.14, 1050, 750, 0.19);
      break;
    case 'wallBreak':
      tone(0, 0.23, 174, 57, 0.61, 0.33);
      noise(0, 0.27, 1970, 0.96);
      for (const [start, hz] of [
        [0.079, 750],
        [0.147, 490],
        [0.227, 330],
      ]) {
        noise(start, 0.045, 2850, 0.41);
        tone(start, 0.13, hz, hz * 0.81, 0.22);
      }
      break;
    case 'plus':
      bell(0, 0.107, 622, 0.56);
      bell(0.06, 0.15, 932, 0.68);
      break;
    case 'longRange':
      bell(0, 0.15, 523, 0.48);
      bell(0.07, 0.17, 784, 0.55);
      tone(0.14, 0.28, 960, 1175, 0.38);
      break;
    case 'guardUp':
      tone(0, 0.26, 245, 370, 0.45, 0.2);
      bell(0.055, 0.28, 622, 0.57);
      break;
    case 'merge':
      tone(0, 0.24, 320, 752, 0.24);
      bell(0, 0.16, 523, 0.53);
      bell(0.075, 0.19, 659, 0.59);
      bell(0.147, 0.24, 988, 0.68);
      break;
    case 'slam':
      noise(0, 0.18, 2000, 0.78);
      tone(0, 0.36, 167, 43, 0.96, 0.58);
      noise(0.035, 0.39, 520, 0.84);
      noise(0.092, 0.13, 1400, 0.44);
      break;
    case 'bruiserStrike':
      noise(0, 0.27, 670, 0.7);
      tone(0, 0.27, 153, 61, 0.74);
      break;
    case 'diverStrike':
      noise(0, 0.27, 2300, 0.67);
      tone(0.01, 0.26, 480, 120, 0.42);
      break;
    case 'wardenCast':
      tone(0, 0.44, 96, 53, 0.77, 0.5);
      noise(0.05, 0.57, 820, 0.68);
      break;
    case 'drillStrike':
      bell(0, 0.24, 1450, 0.59);
      bell(0.05, 0.24, 860, 0.5);
      break;
    case 'kestrelCast':
      noise(0, 0.56, 3300, 0.58);
      tone(0.04, 0.52, 830, 1320, 0.35);
      break;
    case 'engineStrike':
      tone(0, 0.36, 140, 45, 0.81, 0.45);
      noise(0.015, 0.34, 1350, 0.85);
      break;
    case 'vaultLand':
      tone(0, 0.2, 115, 49, 0.7);
      noise(0.01, 0.19, 720, 0.61);
      break;
    case 'glassBreak':
      noise(0, 0.075, 5100, 0.58);
      for (const [t, hz] of [
        [0, 2110],
        [0.035, 1560],
        [0.075, 2940],
        [0.12, 1020],
      ])
        bell(t, 0.19, hz, 0.34);
      break;
    case 'crateBreak':
      noise(0, 0.17, 1280, 0.8);
      noise(0.065, 0.14, 2310, 0.43);
      tone(0, 0.19, 128, 62, 0.39);
      break;
    case 'latchHit':
      bell(0, 0.14, 1290, 0.58);
      noise(0, 0.035, 3000, 0.3);
      break;
    case 'rally':
      for (const [i, hz] of [392, 494, 587, 784].entries()) bell(i * 0.116, 0.34, hz, 0.53);
      break;
    case 'chainSnap':
      noise(0, 0.048, 4300, 0.65);
      bell(0.012, 0.19, 1280, 0.45);
      bell(0.059, 0.18, 711, 0.28);
      break;
    case 'discharge':
      tone(0, 0.29, 1620, 143, 0.66, 0.4);
      noise(0.05, 0.29, 2900, 0.49);
      break;
    case 'bossBurst':
      tone(0, 0.5, 182, 41, 1, 0.44);
      noise(0, 0.12, 4600, 0.85);
      noise(0.048, 0.54, 850, 0.84);
      bell(0.23, 0.28, 784, 0.32);
      bell(0.37, 0.39, 1047, 0.33);
      break;
    case 'victory':
      tone(0, 0.35, 144, 48, 0.84, 0.37);
      noise(0.032, 0.31, 720, 0.7);
      break;
    case 'loss':
      bell(0, 0.21, 392, 0.57);
      bell(0.116, 0.22, 330, 0.58);
      tone(0.246, 0.35, 262, 196, 0.64, 0.22);
      break;
    case 'hit':
      noise(0, 0.061, 1290, 0.58);
      tone(0.003, 0.07, 580, 280, 0.24);
      break;
  }
  let peak = 0.001;
  for (const sample of samples) peak = Math.max(peak, Math.abs(sample));
  for (let i = 0; i < samples.length; i++) samples[i] *= 0.89 / peak;
  return buffer;
}

export function createAudio() {
  let context, mix, output, pendingSuspend;
  let active = false,
    muted = false;
  const sounds = new Map();
  const lastPlayed = new Map();
  const voices = new Set();
  function retire(voice) {
    voices.delete(voice);
    voice.source.onended = null;
    voice.source.disconnect();
    voice.gain.disconnect();
  }
  function quiet() {
    for (const voice of voices) {
      voice.source.stop();
      retire(voice);
    }
    lastPlayed.clear();
  }
  function updateVolume() {
    if (!context) return;
    const now = context.currentTime;
    output.gain.cancelScheduledValues(now);
    output.gain.setTargetAtTime(active && !muted ? 0.8 : 0, now, 0.008);
  }
  function resume() {
    if (active && context && context.state !== 'closed') return context.resume().catch(() => {});
  }
  return {
    unlock() {
      active = true;
      if (!context) {
        const Audio = window.AudioContext || window.webkitAudioContext;
        if (!Audio) return;
        try {
          context = new Audio({ latencyHint: 'interactive' });
        } catch {
          return;
        }
        mix = context.createDynamicsCompressor();
        mix.threshold.value = -12;
        mix.knee.value = 9;
        mix.ratio.value = 5;
        mix.attack.value = 0.004;
        mix.release.value = 0.12;
        output = context.createGain();
        output.gain.value = 0;
        mix.connect(output);
        output.connect(context.destination);
      }
      updateVolume();
      const immediate = resume();
      // A foreground gesture can arrive before an asynchronous tab-background suspend completes.
      return pendingSuspend ? pendingSuspend.then(resume) : immediate;
    },
    setMuted(value) {
      muted = Boolean(value);
      if (muted) quiet();
      updateVolume();
    },
    play(kind, strength = 1, supply = null) {
      if (kind === 'merge') {
        if (supply === 'range' || supply === 'longshot') kind = 'longRange';
        else if (supply === 'shield' || supply === 'medic') kind = 'guardUp';
      }
      const cue = cues[kind];
      if (!cue || !active || muted || !context || context.state !== 'running' || !(strength > 0))
        return;
      const now = context.currentTime;
      if (now - (lastPlayed.get(kind) ?? -Infinity) < cue.interval || voices.size >= 16) return;
      lastPlayed.set(kind, now);
      if (!sounds.has(kind)) sounds.set(kind, buildSound(context, kind));
      const source = context.createBufferSource();
      const gain = context.createGain();
      const voice = { source, gain };
      source.buffer = sounds.get(kind);
      const tonal = kind === 'plus' || kind === 'merge' || kind === 'victory' || kind === 'loss';
      source.playbackRate.value = tonal ? 1 : 0.95 + Math.random() * 0.1;
      gain.gain.value = cue.gain * Math.min(1.36, 0.45 + 0.55 * Math.sqrt(strength));
      source.connect(gain);
      gain.connect(mix);
      voices.add(voice);
      source.onended = () => retire(voice);
      source.start();
    },
    pause() {
      active = false;
      quiet();
      updateVolume();
      if (!context || context.state === 'closed') return;
      const operation = context.suspend().catch(() => {});
      pendingSuspend = operation;
      operation.then(() => {
        if (pendingSuspend === operation) pendingSuspend = undefined;
      });
      return operation;
    },
  };
}
