import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export function block(w, h, d, bevel = 0) {
  return bevel ? new RoundedBoxGeometry(w, h, d, 1, bevel) : new THREE.BoxGeometry(w, h, d);
}

export function part(geometry, tint, x, y, z, rotation = null) {
  const flat = geometry.index ? geometry.toNonIndexed() : geometry;
  if (flat !== geometry) geometry.dispose();
  flat.deleteAttribute('uv');
  if (rotation) flat.applyQuaternion(new THREE.Quaternion().setFromEuler(rotation));
  flat.translate(x, y, z);
  const color = new THREE.Color(tint);
  const count = flat.getAttribute('position').count;
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < colors.length; i += 3) color.toArray(colors, i);
  flat.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return flat;
}

export function combine(pieces) {
  const joined = mergeGeometries(pieces, false);
  for (const piece of pieces) piece.dispose();
  return joined;
}

export function strut(a, b, r, tint, sides = 8) {
  const start = new THREE.Vector3(...a),
    end = new THREE.Vector3(...b);
  const axis = end.clone().sub(start);
  const geo = new THREE.CylinderGeometry(r, r, axis.length(), sides);
  geo.applyQuaternion(
    new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), axis.normalize()),
  );
  const mid = start.lerp(end, 0.5);
  return part(geo, tint, mid.x, mid.y, mid.z);
}
