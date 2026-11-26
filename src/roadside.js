import * as THREE from 'three';
import { block, combine, part, strut } from './scenery-mesh.js';

// Each chapter has a pair of offset landmarks, batched as a single draw.
export function roadside(theme) {
  const pieces = [];
  const teal = '#386167',
    iron = '#394852',
    bronze = '#d9a35c',
    wood = '#866047';
  const box = (w, h, d, c, x, y, z, rot = null) =>
    pieces.push(part(block(w, h, d), c, x, y, z, rot));
  const cylinder = (top, foot, h, n, c, x, y, z, rot = null) =>
    pieces.push(part(new THREE.CylinderGeometry(top, foot, h, n), c, x, y, z, rot));
  const brace = (a, b, r, c) => pieces.push(strut(a, b, r, c, 6));
  function rock(x, y, z, w, h, d, c, angle) {
    const g = new THREE.IcosahedronGeometry(1);
    g.scale(w, h, d);
    pieces.push(part(g, c, x, y, z, new THREE.Euler(0.09, angle, 0.15)));
  }
  function pier(x, z, depth) {
    box(3.6, 0.38, depth, '#806d5b', x, -1.8, z);
    for (const s of [-1, 1]) {
      box(0.13, 0.19, depth, '#c7a073', x + 1.67 * s, -1.52, z);
      for (const f of [-1, 1])
        cylinder(0.16, 0.24, 2.9, 8, wood, x + 1.45 * s, -2.65, z + f * (depth / 2 - 0.25));
    }
    for (let i = 0; i < depth / 0.45; i++)
      box(3.25, 0.034, 0.026, '#a78869', x, -1.58, z - depth / 2 + 0.2 + i * 0.45);
  }
  function beacon(x, z) {
    cylinder(1.2, 1.65, 1.9, 12, '#8c8e83', x, -2.72, z);
    cylinder(0.66, 0.9, 2.55, 14, '#ebe4c4', x, -0.55, z);
    cylinder(0.72, 0.8, 0.68, 14, '#b95843', x, -0.42, z);
    cylinder(0.86, 0.66, 0.22, 14, iron, x, 0.82, z);
    cylinder(0.6, 0.6, 0.7, 12, '#fbdc91', x, 1.24, z);
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      cylinder(0.045, 0.045, 0.83, 5, teal, x + 0.61 * Math.cos(a), 1.25, z + 0.61 * Math.sin(a));
    }
    cylinder(0.05, 0.9, 0.52, 12, '#587579', x, 1.92, z);
    cylinder(0.04, 0.04, 0.39, 8, bronze, x, 2.32, z);
  }
  function mastCrane(x, z, h) {
    const inward = x > 0 ? -1 : 1,
      tip = x + inward * 1.9,
      y = -1.5 + h;
    box(0.75, 0.48, 0.76, iron, x, -1.25, z);
    for (const d of [-0.28, 0.28]) {
      box(0.12, h, 0.12, '#d4a354', x, -1.51 + h / 2, z + d);
      brace([x, y - 0.77, z + d], [tip, y + 0.32, z + d], 0.06, bronze);
      brace([x, y + 0.34, z + d], [tip, y + 0.32, z + d], 0.075, bronze);
      for (let i = 0; i < 4; i++)
        brace([x, -1.37 + (i * h) / 4, z + d], [x, -1.37 + ((i + 1) * h) / 4, z - d], 0.035, teal);
    }
    box(0.59, 0.57, 0.82, '#a47849', x - inward * 0.28, y + 0.14, z);
    cylinder(0.14, 0.14, 0.75, 10, iron, tip, y + 0.29, z, new THREE.Euler(Math.PI / 2, 0, 0));
    brace([tip, y + 0.26, z], [tip, y - 0.79, z], 0.025, iron);
    box(0.7, 0.47, 0.69, '#b77749', tip, y - 1.02, z);
    for (const d of [-0.2, 0.2]) box(0.73, 0.5, 0.045, iron, tip, y - 1.02, z + d);
  }
  if (theme === 'quay') {
    beacon(-8.95, -2);
    for (let k = 0; k < 4; k++)
      rock(-9 - 0.56 * (k % 2), -3.55, -0.2 + k * 0.65, 0.93, 0.55, 1.1, '#87958b', k * 0.7);
    pier(9.1, 15, 5.1);
    mastCrane(9.5, 15.85, 2.55);
    for (const [x, z] of [
      [8.38, 13.6],
      [9.4, 13.4],
      [8.43, 14.36],
    ]) {
      box(0.8, 0.58, 0.65, '#bd906c', x, -1.28, z);
      box(0.09, 0.61, 0.675, teal, x - 0.23, -1.28, z);
    }
  } else if (theme === 'timber') {
    for (const [x, z, h] of [
      [-9, -1, 3.9],
      [-10.7, -3, 4.6],
      [-9.4, 1.2, 3],
      [10, 14, 3.8],
      [11.1, 16, 4.1],
    ]) {
      rock(x, -3.54, z, 1.95, 0.85, 2.1, '#73877a', x);
      cylinder(0.14, 0.25, h * 0.72, 8, wood, x, -2 + h * 0.23, z);
      for (let k = 0; k < 3; k++)
        cylinder(
          0.02,
          ((1.5 - k * 0.28) * h) / 4,
          h * 0.51,
          8,
          ['#3e6857', '#4f8069', '#74a186'][k],
          x,
          -2 + h * (0.38 + k * 0.22),
          z,
        );
    }
    pier(8.65, 17.5, 4.1);
    for (const z of [16.4, 18.6])
      for (const x of [8.1, 9.2]) box(0.14, 2.8, 0.14, wood, x, -0.18, z);
    box(1.72, 0.14, 3.06, '#cb9760', 8.65, 1.18, 17.5);
    cylinder(0, 1.83, 0.71, 4, '#587c70', 8.65, 1.6, 17.5, new THREE.Euler(0, 0.785, 0));
  } else if (theme === 'quarry' || theme === 'cinder' || theme === 'ice') {
    const glacial = theme === 'ice',
      lava = theme === 'cinder';
    const colors = glacial
      ? ['#8dbdcc', '#b4d4db', '#d5e9e7']
      : lava
        ? ['#433f49', '#57505e', '#736362']
        : ['#957765', '#a7866d', '#c1a383'];
    for (const [s, origin] of [
      [-1, 0],
      [1, 17],
    ])
      for (let k = 0; k < 6; k++) {
        const x = s * (8.6 + (k % 3) * 0.98),
          z = origin + ((k % 2) * 2 - 1) * (k * 0.64 + 0.4),
          h = 1.32 + (k % 3) * 0.77;
        rock(x, -3.29, z, 2.12, h, 2.32, colors[0], k * 1.27);
        if (lava) {
          cylinder(0.58, 0.8, h, 6, colors[k % 3], x, -2 + h * 0.26, z);
          cylinder(0.49, 0.51, 0.09, 6, '#b96845', x, -2 + h * 0.76, z);
        } else {
          rock(x, -3.25 + h * 0.44, z, 1.62, h * 0.68, 1.95, colors[1], k * 1.27);
          rock(x, -3.17 + h * 0.72, z, 1.18, h * 0.45, 1.49, colors[2], k * 1.27);
        }
        if (glacial && k % 2 === 0)
          cylinder(0.01, 0.44, 1.75, 5, '#a5edf0', x, -0.95, z, new THREE.Euler(0, 0, s * 0.24));
      }
    if (!lava && !glacial) {
      pier(9.7, 10, 4.3);
      mastCrane(9.6, 10.5, 3.4);
    }
  } else if (theme === 'forge') {
    pier(-9.4, 0, 6.1);
    mastCrane(-9.5, 0, 4.1);
    pier(9.3, 15, 7.2);
    for (const [x, z, h] of [
      [8.8, 16, 3.8],
      [10, 14.8, 2.9],
    ]) {
      cylinder(0.37, 0.43, h, 14, '#637d83', x, -1.4 + h / 2, z);
      for (const y of [0.17, 0.57, 0.95])
        cylinder(0.42, 0.42, 0.12, 14, bronze, x, -1.4 + y * h, z);
      cylinder(0.29, 0.29, 0.06, 14, iron, x, -1.36 + h, z);
    }
    for (const z of [12.1, 13.2]) box(2.2, 0.63, 0.82, '#a86c49', 9.24, -1.26, z);
  }
  return combine(pieces);
}
