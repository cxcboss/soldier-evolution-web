import * as THREE from 'three';

// The source paintings include a few transparent edge pixels to keep minified art clean.
// Each pivot sits between the boots. The captain's cannon makes his crop asymmetric.
const designs = {
  ally: { width: 0.475, height: 0.86, pivot: 0.5, pad: 0.008, capacity: 180, grid: [3, 5] },
  captain: { width: 1.13, height: 1.73, pivot: 0.43, pad: 0.009, capacity: 1, grid: [13, 16] },
  grunt: { width: 0.515, height: 0.86, pivot: 0.5, pad: 0.011, capacity: 1800, grid: [3, 5] },
  boss: { width: 3.94, height: 4.7, pivot: 0.5, pad: 0.01, capacity: 1, grid: [8, 10] },
};
const clamp = THREE.MathUtils.clamp;
const smooth = THREE.MathUtils.smoothstep;

const vertexShader = `
  attribute vec3 anchor;
  attribute vec2 dimensions;
  attribute vec4 motion;
  attribute vec4 treatment;
  uniform vec3 cameraRight;
  uniform vec3 cameraLift;
  uniform float pivot;
  uniform float padding;
  #ifdef BOSS
    attribute float piece;
    vec2 turnAt(vec2 p, vec2 hinge, float angle) {
      float c=cos(angle), s=sin(angle); p-=hinge;
      return hinge + vec2(c*p.x-s*p.y,s*p.x+c*p.y);
    }
  #endif
  varying vec2 imageUv;
  varying vec3 colorTreatment;
  void main() {
    imageUv = uv;
    #ifdef BOSS
      imageUv = (uv+vec2(mod(piece,3.0),1.0-floor(piece/3.0)))/vec2(3.0,2.0);
      bool posing = motion.w > 0.001;
      if ((posing && piece < 0.5) || (!posing && piece > 0.5)) {
        gl_Position=vec4(2.0,2.0,2.0,1.0);
        return;
      }
    #endif
    colorTreatment = treatment.xyz;
    vec2 point = vec2(uv.x - pivot, (uv.y-padding)/(1.0-2.0*padding));
    float stride = sin(motion.x), run = motion.y;
    float legs = 1.0-smoothstep(0.08, 0.38, uv.y);
    float sideSign = smoothstep(pivot-0.05, pivot+0.05, uv.x)*2.0-1.0;
    point.x += run * stride * (0.023*legs + 0.014*uv.y);
    point.y += run * (0.048*max(0.0, sideSign*stride)*legs + 0.013*stride*stride*uv.y);
    point.x += treatment.w*uv.y;
    #ifdef CAPTAIN
      float barrel = smoothstep(0.53,0.78,uv.x)*smoothstep(0.40,0.62,uv.y);
      point.y -= (barrel*0.093+uv.y*0.017)*motion.w;
      point.x += barrel*motion.w*0.023;
    #endif
    point *= dimensions;
    #ifdef BOSS
      float wind = smoothstep(0.02,0.53,motion.w)*(1.0-smoothstep(0.59,0.78,motion.w));
      float impact = smoothstep(0.59,0.78,motion.w)*(1.0-smoothstep(0.89,1.0,motion.w));
      if (piece > 1.5) {
        float side = piece<3.5 ? -1.0 : 1.0;
        vec2 shoulder = vec2(side<0.0 ? 0.211 : 0.795,0.727);
        vec2 elbow = vec2(side<0.0 ? 0.122 : 0.858,side<0.0 ? 0.50 : 0.493);
        shoulder.x-=pivot; elbow.x-=pivot;
        if (piece==3.0 || piece==5.0) {
          point=turnAt(point,elbow*dimensions,side*(0.87*wind-0.10*impact));
        }
        point=turnAt(point,shoulder*dimensions,side*(2.01*wind-0.11*impact));
      }
      point.x *= 1.0+impact*0.072;
      point.y *= 1.0+wind*0.049-impact*0.235;
    #endif
    float angle = motion.z, c = cos(angle), s = sin(angle);
    // A falling unit tumbles around the waist. Upright runners remain boot-anchored.
    vec2 center = vec2(0.0,dimensions.y*0.42);
    point -= center;
    point = vec2(c*point.x-s*point.y,s*point.x+c*point.y)+center;
    vec3 world = anchor + cameraRight*point.x + cameraLift*point.y;
    gl_Position = projectionMatrix*viewMatrix*vec4(world, 1.0);
    #ifdef BOSS
      float layer = (piece==3.0 || piece==5.0) ? 1.0 : ((piece==2.0 || piece==4.0) ? 2.0 : 3.0);
      gl_Position.z -= layer*0.000020*gl_Position.w;
    #endif
  }
`;

const fragmentShader = `
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
`;

// Preserve the AI portrait on normal runs. For a slam, the painted fists turn on
// elbow and shoulder hinges instead of stretching the edge of a single billboard.
function bossPoseTexture(original) {
  const tile = 448,
    sheet = document.createElement('canvas');
  sheet.width = tile * 3;
  sheet.height = tile * 2;
  const ctx = sheet.getContext('2d');
  function path(points) {
    const p = new Path2D();
    p.moveTo(...points[0]);
    for (let i = 1; i < points.length; i++) p.lineTo(...points[i]);
    p.closePath();
    return p;
  }
  const left = path([
    [-2, -2],
    [80, -2],
    [82, 99],
    [90, 127],
    [102, 148],
    [115, 162],
    [123, 190],
    [128, 226],
    [135, 245],
    [125, 262],
    [110, 277],
    [101, 296],
    [118, 305],
    [136, 329],
    [140, 362],
    [127, 392],
    [104, 418],
    [-2, 424],
  ]);
  const right = path([
    [429, -2],
    [514, -2],
    [514, 425],
    [381, 425],
    [351, 398],
    [337, 369],
    [344, 342],
    [355, 324],
    [372, 310],
    [385, 299],
    [373, 289],
    [363, 273],
    [360, 257],
    [366, 234],
    [374, 205],
    [385, 176],
    [398, 148],
    [412, 120],
  ]);
  const lowLeft = path([
    [-2, 225],
    [12, 235],
    [43, 253],
    [77, 266],
    [111, 273],
    [128, 258],
    [143, 244],
    [146, 514],
    [-2, 514],
  ]);
  const lowRight = path([
    [345, 279],
    [366, 264],
    [390, 253],
    [415, 248],
    [438, 247],
    [461, 251],
    [483, 263],
    [496, 277],
    [514, 288],
    [514, 514],
    [345, 514],
  ]);
  const image = original.image;
  function paint(i, draw) {
    ctx.save();
    ctx.translate((i % 3) * tile, Math.floor(i / 3) * tile);
    ctx.scale(tile / 512, tile / 512);
    ctx.beginPath();
    ctx.rect(0, 0, 512, 512);
    ctx.clip();
    draw();
    ctx.restore();
  }
  function patch(x, y, rx, ry, light, dark) {
    const g = ctx.createRadialGradient(x - rx * 0.25, y - ry * 0.27, 1, x, y, Math.max(rx, ry));
    g.addColorStop(0, light);
    g.addColorStop(1, dark);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
    ctx.fill();
  }
  const picture = () => ctx.drawImage(image, 0, 0, 512, 512);
  paint(0, picture);
  paint(1, () => {
    picture();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fill(left);
    ctx.fill(right);
    ctx.globalCompositeOperation = 'destination-over';
    patch(110, 145, 29, 32, '#eb3a31', '#9c201d');
    patch(404, 146, 28, 32, '#e2352f', '#9d211e');
  });
  function arm(i, armPath, lowerPath, isHand, elbowX, elbowY) {
    paint(i, () => {
      if (isHand) {
        patch(elbowX, elbowY, 23, 23, '#ed9a60', '#b85b34');
        ctx.clip(armPath);
        ctx.clip(lowerPath);
        picture();
      } else {
        ctx.clip(armPath);
        picture();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fill(lowerPath);
        ctx.globalCompositeOperation = 'destination-over';
        patch(elbowX, elbowY - 4, 25, 18, '#e3392e', '#a5221e');
      }
    });
  }
  arm(2, left, lowLeft, false, 62, 256);
  arm(3, left, lowLeft, true, 62, 256);
  arm(4, right, lowRight, false, 439, 260);
  arm(5, right, lowRight, true, 439, 260);
  const texture = new THREE.CanvasTexture(sheet);
  original.dispose();
  return texture;
}

function bossPlane() {
  const positions = [],
    uvs = [],
    pieces = [],
    indices = [];
  // Draw farther pieces first so the rolled cuffs remain in front of the elbows.
  const parts = [
    [0, 0, 0, 1, 1],
    [3, 0, 0.16, 0.3, 0.58],
    [5, 0.65, 0.12, 1, 0.58],
    [2, 0, 0.44, 0.31, 0.86],
    [4, 0.68, 0.41, 1, 0.86],
    [1, 0.14, 0, 0.86, 1],
  ];
  for (const [part, u0, v0, u1, v1] of parts) {
    const columns = 8,
      rows = 10,
      base = pieces.length;
    for (let y = 0; y <= rows; y++)
      for (let x = 0; x <= columns; x++) {
        const u = u0 + ((u1 - u0) * x) / columns,
          v = v0 + ((v1 - v0) * y) / rows;
        positions.push(u - 0.5, v - 0.5, 0);
        uvs.push(u, v);
        pieces.push(part);
        if (x === columns || y === rows) continue;
        const a = base + y * (columns + 1) + x,
          b = a + 1,
          c = a + columns + 1,
          d = c + 1;
        indices.push(a, b, c, b, d, c);
      }
  }
  const geo = new THREE.BufferGeometry();
  geo.setIndex(indices);
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setAttribute('piece', new THREE.Float32BufferAttribute(pieces, 1));
  return geo;
}

function makeBatch(scene, name, texture, right, lift) {
  const spec = designs[name];
  const plane = name === 'boss' ? bossPlane() : new THREE.PlaneGeometry(1, 1, ...spec.grid);
  if (name === 'boss') texture = bossPoseTexture(texture);
  const geometry = new THREE.InstancedBufferGeometry().copy(plane);
  const attributes = {};
  for (const [key, size] of [
    ['anchor', 3],
    ['dimensions', 2],
    ['motion', 4],
    ['treatment', 4],
  ]) {
    const attribute = new THREE.InstancedBufferAttribute(
      new Float32Array(spec.capacity * size),
      size,
    );
    attribute.setUsage(THREE.DynamicDrawUsage);
    attributes[key] = attribute;
    geometry.setAttribute(key, attribute);
  }
  geometry.instanceCount = 0;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  const material = new THREE.ShaderMaterial({
    uniforms: {
      portrait: { value: texture },
      cameraRight: { value: right },
      cameraLift: { value: lift },
      pivot: { value: spec.pivot },
      padding: { value: spec.pad },
    },
    defines: name === 'boss' ? { BOSS: 1 } : name === 'captain' ? { CAPTAIN: 1 } : {},
    vertexShader,
    fragmentShader,
    depthWrite: true,
    transparent: false,
    toneMapped: false,
    alphaToCoverage: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = `AI ${name}`;
  mesh.visible = false;
  mesh.frustumCulled = false;
  scene.add(mesh);
  let count = 0;
  return {
    begin() {
      count = 0;
    },
    clear() {
      count = 0;
      geometry.instanceCount = 0;
      mesh.visible = false;
    },
    add(
      x,
      y,
      z,
      scaleX,
      scaleY,
      step,
      run,
      angle = 0,
      action = 0,
      gold = 0,
      white = 0,
      gray = 0,
      lean = 0,
    ) {
      if (count >= spec.capacity || scaleX <= 0.001 || scaleY <= 0.001) return;
      attributes.anchor.setXYZ(count, x, y, z);
      attributes.dimensions.setXY(count, spec.width * scaleX, spec.height * scaleY);
      attributes.motion.setXYZW(count, step, run, angle, action);
      attributes.treatment.setXYZW(count, gold, white, gray, lean);
      count++;
    },
    flush() {
      geometry.instanceCount = count;
      mesh.visible = count > 0;
      if (!count) return;
      for (const attribute of Object.values(attributes)) {
        attribute.clearUpdateRanges();
        attribute.addUpdateRange(0, count * attribute.itemSize);
        attribute.needsUpdate = true;
      }
    },
  };
}

export async function createSpriteArt(scene) {
  const loader = new THREE.TextureLoader();
  const names = Object.keys(designs);
  const loaded = await Promise.allSettled(
    names.map((name) => loader.loadAsync(`./art/${name}.webp`)),
  );
  const failure = loaded.find((result) => result.status === 'rejected');
  if (failure) {
    for (const result of loaded) if (result.status === 'fulfilled') result.value.dispose();
    throw new Error('角色插画加载失败', { cause: failure.reason });
  }
  const right = new THREE.Vector3(),
    lift = new THREE.Vector3(),
    viewUp = new THREE.Vector3();
  const batches = Object.fromEntries(
    names.map((name, i) => [name, makeBatch(scene, name, loaded[i].value, right, lift)]),
  );
  const groups = Object.values(batches);
  const clear = () => groups.forEach((batch) => batch.clear());

  function draw(s, camera, time, mode) {
    if (mode !== 'ai' && mode !== 'hybrid') {
      clear();
      return;
    }
    for (const batch of groups) batch.begin();
    camera.updateWorldMatrix(true, false);
    right.setFromMatrixColumn(camera.matrixWorld, 0);
    right.y = 0;
    right.normalize();
    viewUp.setFromMatrixColumn(camera.matrixWorld, 1);
    // A small pitch retains the painted helmet and shoulder volume under the high camera.
    lift.set(0, 1, 0).lerp(viewUp, 0.42).normalize();
    const full = mode === 'ai';
    const moving = s.phase === 'ready' ? 0.3 : s.playing ? 1 : 0;
    const step = time * 9.2;
    if (full) {
      for (const column of s.columns) {
        for (const e of column.units) {
          if (e.alive) batches.grunt.add(e.x, 0, e.z, e.size, e.size, step + e.phase, moving);
        }
      }
    }
    for (const e of s.runners) {
      if (e.alive) batches.grunt.add(e.x, 0, e.z, e.size, e.size, step * 1.13 + e.phase, moving);
    }
    for (const a of s.allies) {
      const p = clamp(a.age / 0.32, 0, 1),
        pop = 0.81 + 0.19 * p + 0.095 * Math.sin(p * Math.PI);
      batches.ally.add(
        a.x,
        0.035 * Math.sin(p * Math.PI),
        a.z,
        pop,
        pop,
        step + a.phase,
        moving,
        0,
        0,
        0.8 * (1 - p),
        0.22 * (1 - p),
      );
    }
    for (const a of s.merging) {
      const p = clamp(a.t / 0.32, 0, 1),
        travel = smooth(p, 0, 1);
      const size = 1 - 0.85 * travel;
      batches.ally.add(
        THREE.MathUtils.lerp(a.x, s.x, travel),
        0.5 * Math.sin(p * Math.PI),
        a.z * (1 - travel),
        size,
        size,
        step + a.phase,
        0.25,
        0.23 * Math.sin(p * Math.PI),
        0,
        0.15 + 0.7 * p,
        0.22 + 0.37 * p,
      );
    }
    if (full) {
      for (const e of s.falling) {
        const p = clamp(e.t / 1.02, 0, 1),
          size = e.size * (1 - smooth(p, 0.78, 1));
        const tilt = e.roll * e.t + 0.16 * Math.sin(e.spin * e.t);
        const batch = e.side === 'red' ? batches.grunt : batches.ally;
        batch.add(
          e.x,
          e.y,
          e.z,
          size,
          size,
          step + e.phase,
          0,
          tilt,
          0,
          0,
          0.64 * (1 - smooth(p, 0.04, 0.31)),
          0.72 * smooth(p, 0.05, 0.31),
        );
      }
      if (s.phase !== 'lost' || s.endTime < 0.25) {
        const size = s.visualScale,
          fade = s.phase === 'lost' ? clamp(s.endTime / 0.25, 0, 1) : 0;
        batches.captain.add(
          s.x,
          0,
          s.captainZ,
          size,
          size * (1 - 0.55 * fade),
          step * 0.83,
          moving,
          -0.38 * fade,
          s.recoil,
          0.66 * s.mergeGlow,
          0.14 * s.mergeGlow + 0.48 * s.hurt + 0.32 * fade,
          0,
          clamp(s.velocity * 0.007, -0.095, 0.095),
        );
      }
      const b = s.boss;
      if(s.round%3===0) {
        const down = s.phase === 'won' ? smooth(s.endTime, .25, .92) : 0;
        const fade = 1;
        batches.boss.add(
          b.x,
          0,
          b.z,
          (1 + 0.12 * down) * fade,
          (1 - 0.62 * down) * fade,
          time * 6.35,
          moving * (b.active ? 0.65 : 0.16) * (1 - b.slam),
          -0.97 * down,
          b.slam,
          0,
          0.54 * b.hit,
          0.5 * down,
        );
      }
    }
    for (const batch of groups) batch.flush();
  }
  return { draw, clear };
}
