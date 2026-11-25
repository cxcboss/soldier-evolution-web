import * as THREE from 'three';
import { landscapes, laneWidth } from './campaign.js';
import { block, combine, part, strut } from './scenery-mesh.js';

const metal = new THREE.MeshPhongMaterial({
  vertexColors: true,
  shininess: 33,
  specular: 0x54565b,
});
const turn = (x = 0, y = 0, z = 0) => new THREE.Euler(x, y, z);
const slab = (w, h, d, color, x, y, z, bevel = 0, rot = null) =>
  part(block(w, h, d, bevel), color, x, y, z, rot);
const drum = (rt, rb, h, color, x, y, z, rot = null, n = 16) =>
  part(new THREE.CylinderGeometry(rt, rb, h, n), color, x, y, z, rot);
const ring = (r, t, color, x, y, z, rot = null) =>
  part(new THREE.TorusGeometry(r, t, 7, 30), color, x, y, z, rot);
const batch = (parts) => new THREE.Mesh(combine(parts), metal);
const iron = '#506272',
  gold = '#e4aa48',
  pale = '#f6dda0',
  dark = '#394655',
  wood = '#b78053';
const clamp = THREE.MathUtils.clamp;

function hardware(kind, length = 4.4, direction = 1) {
  const base = [],
    planks = [],
    moving = [];
  if (kind === 'gap' || kind === 'bridge') {
    const half = length / 2;
    for (const s of [-1, 1]) {
      base.push(slab(4.22, 0.43, 0.25, iron, 0, -0.2, s * (half + 0.04), 0.035));
      for (let k = -3; k <= 3; k++)
        base.push(
          slab(
            0.29,
            0.025,
            0.19,
            k % 2 ? gold : dark,
            k * 0.53,
            0.025,
            s * (half + 0.21),
            0,
            turn(0, 0.23, 0),
          ),
        );
      for (const side of [-1, 1]) {
        const x = side * 1.97;
        base.push(
          slab(0.2, 0.83, 0.24, dark, x, -0.39, s * half, 0.025),
          strut([x, -0.85, s * half], [x, -0.1, s * (half + 0.65)], 0.055, iron),
        );
      }
    }
    const steps = Math.round(length / 0.4);
    for (let i = 0; i < steps; i++) {
      const z = ((i + 0.5) * length) / steps;
      planks.push(
        slab(4.03, 0.14, length / steps - 0.025, i % 3 === 0 ? '#c59762' : wood, 0, 0.01, z, 0.018),
      );
      for (const x of [-1.54, 1.54])
        planks.push(drum(0.056, 0.056, 0.015, iron, x, 0.085, z, null, 7));
    }
    for (const x of [-1.5, 1.5]) planks.push(slab(0.19, 0.28, length, iron, x, -0.14, half, 0.024));
    if (kind === 'bridge') {
      for (const side of [-1, 1]) {
        const x = side * 1.92;
        base.push(
          slab(0.21, 1.72, 0.34, iron, x, 0.82, -half, 0.04),
          drum(0.23, 0.23, 0.12, gold, x, 1.68, -half, turn(0, 0, Math.PI / 2)),
          strut([x, 0.12, -half - 0.42], [x, 1.3, -half], 0.054, pale),
        );
      }
      base.push(drum(0.16, 0.16, 3.9, iron, 0, 0.11, -half, turn(0, 0, Math.PI / 2)));
      base.push(
        slab(1.33, 0.61, 0.41, iron, 0, 0.33, half + 0.24, 0.055),
        slab(1.45, 0.09, 0.48, gold, 0, 0.64, half + 0.24, 0.025),
      );
    } else {
      for (let i = 0; i < 5; i++)
        base.push(
          strut(
            [i * 0.63 - 1.25, -0.11, -half],
            [i * 0.63 - 1.21, -0.18, -half + 0.28 + (i % 2) * 0.18],
            0.024,
            iron,
            6,
          ),
        );
    }
  } else if (kind === 'cache') {
    for (let r = 0; r < 3; r++)
      for (let i = 0; i < 5; i++) {
        const colors = ['#af7149', '#ba8051', '#cf955f', '#a56745'];
        base.push(
          slab(
            0.643,
            0.366,
            0.65,
            colors[(i + 2 * r) % 4],
            (i - 2) * 0.665,
            0.22 + r * 0.385,
            0,
            0.033,
          ),
        );
      }
    for (const x of [-1.53, 1.53]) {
      base.push(slab(0.17, 1.24, 0.75, gold, x, 0.6, 0, 0.035));
      for (const y of [0.19, 0.57, 1.02])
        base.push(drum(0.047, 0.047, 0.034, pale, x, y, 0.389, turn(Math.PI / 2), 8));
    }
    base.push(
      slab(3.38, 0.11, 0.72, dark, 0, 1.18, 0, 0.025),
      slab(1.7, 0.61, 0.07, dark, 0, 0.63, 0.345, 0.055),
    );
  } else if (kind === 'coil') {
    base.push(
      drum(0.78, 0.9, 0.22, iron, 0, 0.12, 0, null, 28),
      drum(0.26, 0.34, 0.96, '#b2d5ce', 0, 0.68, 0, null, 28),
    );
    for (let i = 0; i < 7; i++)
      base.push(
        ring(
          0.39 - i * 0.016,
          0.044,
          i % 2 ? '#cc8548' : '#f3b867',
          0,
          0.3 + i * 0.115,
          0,
          turn(Math.PI / 2),
        ),
      );
    base.push(
      drum(0.25, 0.3, 0.2, gold, 0, 1.19, 0),
      part(new THREE.IcosahedronGeometry(0.21, 1), '#96ffff', 0, 1.39, 0),
    );
  } else if (kind === 'belt') {
    base.push(slab(3.9, 0.065, length, '#697981', 0, 0.035, 0, 0.045));
    for (const x of [-1.92, 1.92]) base.push(slab(0.1, 0.11, length, gold, x, 0.074, 0, 0.022));
    for (let j = 0; j < 11; j++)
      base.push(slab(3.74, 0.045, 0.055, '#475765', 0, 0.08, ((j - 5) * length) / 11));
    for (let j = 0; j < 5; j++)
      for (const side of [-1, 1])
        moving.push(
          strut(
            [-0.24 * direction, 0.107, (j - 2) * 1.53 + side * 0.3],
            [0.24 * direction, 0.107, (j - 2) * 1.53],
            0.052,
            pale,
            6,
          ),
        );
  }
  return {
    base: batch(base),
    deck: planks.length ? batch(planks) : null,
    arrows: moving.length ? batch(moving) : null,
  };
}

function marker() {
  const c = document.createElement('canvas');
  c.width = 320;
  c.height = 104;
  const ctx = c.getContext('2d'),
    map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.56, 0.51),
    new THREE.MeshBasicMaterial({ map, transparent: true, depthWrite: false, toneMapped: false }),
  );
  let previous = '';
  return {
    mesh,
    label(text) {
      if (text === previous) return;
      previous = text;
      ctx.clearRect(0, 0, 320, 104);
      ctx.font = '900 69px "Arial Black","PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 9;
      ctx.strokeStyle = '#2e3b48';
      ctx.strokeText(text, 160, 56);
      ctx.fillStyle = '#fff3cf';
      ctx.fillText(text, 160, 56);
      map.needsUpdate = true;
    },
    dispose() {
      map.dispose();
      mesh.geometry.dispose();
      mesh.material.dispose();
    },
  };
}

function outlook(theme) {
  const c = landscapes[theme],
    bits = [];
  // The props hang outside the traversable deck and share one instanced draw.
  for (const s of [-1, 1]) {
    const x = s * 6.68;
    bits.push(
      slab(0.25, 4.6, 0.38, c.frame, x, -2.36, 0, 0.025),
      strut([x, -2.4, 0], [x, -0.3, 2.1], 0.085, c.frame),
    );
    if (theme === 'timber') {
      for (const dx of [0, 0.45])
        bits.push(drum(0.13, 0.18, 2.0, '#956b48', x + s * dx, -0.4, 1.3 + dx, null, 9));
      bits.push(strut([x, 0.32, 1.3], [x, 0.28, 4.9], 0.046, '#bda77e'));
      for (const [h, off] of [
        [2.1, 1.8],
        [1.5, 3.0],
      ]) {
        bits.push(drum(0.15, 0.19, 1.8, wood, x + s * off, -3.0, 1 + off, null, 7));
        for (let k = 0; k < 3; k++)
          bits.push(
            part(
              new THREE.ConeGeometry(0.77 - k * 0.18, h * 0.57, 8),
              ['#477b62', '#599170', '#79a181'][k],
              x + s * off,
              -2.65 + k * 0.45,
              1 + off,
            ),
          );
      }
    } else if (theme === 'quarry' || theme === 'cinder' || theme === 'ice') {
      for (let k = 0; k < 4; k++) {
        const rock = new THREE.ConeGeometry(
          0.58 + k * 0.13,
          1.4 + (k % 2) * 1.3,
          theme === 'ice' ? 5 : 7,
        );
        bits.push(
          part(
            rock,
            theme === 'ice' ? ['#85bdce', '#b2dce4'][k % 2] : k % 2 ? c.frame : c.joint,
            x + s * (1 + k * 0.55),
            -2.5 + 0.28 * k,
            k * 1.35,
            turn(0.09 * k, 0.6 * k, s * 0.16),
          ),
        );
      }
      if (theme === 'cinder')
        bits.push(
          drum(0.23, 0.34, 0.49, '#c78047', x, -0.02, 0),
          drum(0.18, 0.21, 0.14, '#ffcb76', x, 0.28, 0),
        );
    } else if (theme === 'forge') {
      bits.push(
        drum(0.28, 0.28, 3.5, '#657f8e', x + s * 0.36, -0.53, 0.4, turn(Math.PI / 2)),
        ring(0.32, 0.056, gold, x + s * 0.36, -0.53, 1.75),
        slab(0.46, 0.51, 0.44, iron, x, 0.21, 0, 0.045),
      );
    } else {
      bits.push(
        drum(0.18, 0.24, 0.48, '#737f85', x, 0.13, 0),
        drum(0.27, 0.25, 0.11, gold, x, 0.42, 0),
      );
      bits.push(
        drum(0.34, 0.48, 0.58, '#c16649', x + s * 1.6, -3.07, 1.6),
        drum(0.18, 0.3, 0.23, pale, x + s * 1.6, -2.68, 1.6),
      );
    }
  }
  return combine(bits);
}

export function createTerrainArt(root) {
  const cuts = Array.from({ length: 10 }, () => new THREE.Vector4(0, -1000, 0, 0));
  function cutDeck(mat) {
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.roadCuts = { value: cuts };
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 deckPosition;')
        .replace(
          '#include <begin_vertex>',
          '#include <begin_vertex>\ndeckPosition=(modelMatrix*vec4(transformed,1.)).xyz;',
        );
      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          '#include <common>\nvarying vec3 deckPosition; uniform vec4 roadCuts[10];',
        )
        .replace(
          '#include <clipping_planes_fragment>',
          '#include <clipping_planes_fragment>\nfor(int i=0;i<10;i++){vec4 h=roadCuts[i];if(abs(deckPosition.x-h.x)<h.z && abs(deckPosition.z-h.y)<h.w)discard;}',
        );
    };
  }
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(140, 154),
    new THREE.ShaderMaterial({
      uniforms: {
        deep: { value: new THREE.Color() },
        crest: { value: new THREE.Color() },
        clock: { value: 0 },
        origin: { value: 0 },
      },
      vertexShader:
        'varying vec3 pos; void main(){vec4 w=modelMatrix*vec4(position,1.);pos=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
      fragmentShader: `varying vec3 pos; uniform vec3 deep,crest;uniform float clock,origin;
      void main(){vec2 q=vec2(pos.x,pos.z-origin);float n=sin(q.y*1.36+sin(q.x*.78+clock*.34)*1.5+clock*.45)+.6*sin(q.x*1.45-q.y*.84-clock*.29);
      float streak=smoothstep(1.36,1.53,n);float light=.10+.13*sin(q.x*.14+q.y*.16)+streak*.33;
      gl_FragColor=vec4(mix(deep,crest,max(0.,light)),1.);
      #include <colorspace_fragment>
      }`,
    }),
  );
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, -3.7, -43);
  root.add(water);
  const terrainAssets = new Map(),
    scenic = new Map(),
    live = new Map(),
    matrix = new THREE.Matrix4();
  let region, features;
  const chainGeo = new THREE.CylinderGeometry(0.035, 0.035, 1, 8),
    chainMat = new THREE.MeshPhongMaterial({ color: 0xab9b79 });
  const a = new THREE.Vector3(),
    b = new THREE.Vector3(),
    axis = new THREE.Vector3(),
    up = new THREE.Vector3(0, 1, 0);
  function item(p) {
    const key = p.kind + ':' + (p.length || 0) + ':' + (p.direction || 0);
    if (!terrainAssets.has(key)) terrainAssets.set(key, hardware(p.kind, p.length, p.direction));
    const template = terrainAssets.get(key),
      g = new THREE.Group(),
      base = template.base.clone();
    g.add(base);
    let leaf, arrows, label;
    const chains = [];
    if (template.deck) {
      leaf = template.deck.clone();
      leaf.position.z = -p.length / 2;
      g.add(leaf);
    }
    if (template.arrows) {
      arrows = template.arrows.clone();
      g.add(arrows);
    }
    if (p.kind === 'cache' || p.kind === 'bridge' || p.kind === 'coil') {
      label = marker();
      g.add(label.mesh);
      label.mesh.position.set(
        0,
        p.kind === 'cache' ? 0.66 : p.kind === 'coil' ? 0.55 : 0.43,
        p.kind === 'bridge' ? p.length / 2 + 0.48 : p.kind === 'coil' ? 0.56 : 0.397,
      );
    }
    if (p.kind === 'bridge')
      for (let i = 0; i < 2; i++) {
        const m = new THREE.Mesh(chainGeo, chainMat);
        g.add(m);
        chains.push(m);
      }
    root.add(g);
    return { g, base, leaf, arrows, chains, label };
  }
  function update(s) {
    const theme = s.route.theme;
    if (theme !== region) {
      if (region) scenic.get(region).visible = false;
      region = theme;
      if (!scenic.has(theme)) {
        const m = new THREE.InstancedMesh(outlook(theme), metal, 10);
        m.frustumCulled = false;
        scenic.set(theme, m);
        root.add(m);
      }
      scenic.get(theme).visible = true;
      water.material.uniforms.deep.value.set(landscapes[theme].deep);
      water.material.uniforms.crest.value.set(landscapes[theme].glint);
    }
    const scenery = scenic.get(theme);
    for (let i = 0; i < 10; i++)
      scenery.setMatrixAt(i, matrix.makeTranslation(0, 0, 12 - i * 10 + (s.distance % 10)));
    scenery.instanceMatrix.needsUpdate = true;
    water.material.uniforms.clock.value = s.elapsed;
    water.material.uniforms.origin.value = s.distance;
    if (s.features !== features) {
      for (const v of live.values()) {
        v.g.removeFromParent();
        v.label?.dispose();
      }
      live.clear();
      features = s.features;
    }
    let count = 0;
    for (const p of s.features) {
      if (p.z < -68 || p.z > 14) {
        const v = live.get(p);
        if (v) v.g.visible = false;
        continue;
      }
      const v = live.get(p) || item(p);
      live.set(p, v);
      v.g.visible = true;
      v.g.position.set(p.x, 0, p.z);
      if (p.kind === 'gap' || p.kind === 'bridge') {
        if (count < cuts.length) cuts[count++].set(p.x, p.z, laneWidth / 2 - 0.055, p.length / 2);
        v.leaf.visible = p.kind === 'bridge' || p.state === 'repaired';
        const progress = THREE.MathUtils.smoothstep(p.age, 0, 0.58);
        v.leaf.rotation.x =
          p.state === 'cut'
            ? -0.2 + 1.6 * progress
            : p.state === 'ready' && p.kind === 'bridge'
              ? -0.2
              : p.state === 'linked'
                ? -0.2 * (1 - progress)
                : 0;
        if (p.state === 'repaired') v.leaf.position.y = 0.03 + 0.22 * (1 - progress);
        for (let i = 0; i < v.chains.length; i++) {
          const m = v.chains[i],
            x = (i ? 1 : -1) * 1.83;
          m.visible = p.state !== 'cut' && p.state !== 'repaired';
          a.set(x, 1.63, -p.length / 2);
          b.set(
            x,
            -Math.sin(v.leaf.rotation.x) * p.length + 0.1,
            -p.length / 2 + Math.cos(v.leaf.rotation.x) * p.length,
          );
          axis.subVectors(b, a);
          m.scale.y = axis.length();
          m.position.copy(a).lerp(b, 0.5);
          m.quaternion.setFromUnitVectors(up, axis.normalize());
        }
      }
      if (v.arrows) v.arrows.position.x = Math.sin(s.elapsed * 5) * 0.39 * p.direction;
      if (v.label) {
        v.label.mesh.visible = p.state === 'ready';
        if (v.label.mesh.visible)
          v.label.label(
            (p.kind === 'bridge' ? '断索 ' : p.kind === 'coil' ? '电 ' : '箱 ') + Math.ceil(p.hp),
          );
      }
      if ((p.kind === 'cache' || p.kind === 'coil') && p.state !== 'ready')
        v.base.scale.setScalar(1 - THREE.MathUtils.smoothstep(p.age, 0, 0.24));
    }
    for (let i = count; i < cuts.length; i++) cuts[i].set(0, -1000, 0, 0);
  }
  return { cutDeck, update };
}
