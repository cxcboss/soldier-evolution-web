import * as THREE from 'three';
const art = ['diver', 'warden', 'drill', 'kestrel', 'engine'];
export function creaturePaint() {
  const loader = new THREE.TextureLoader(),
    images = new Map(),
    pending = new Map();
  function prepare(id) {
    if (!art.includes(id) || images.has(id)) return Promise.resolve(true);
    if (!pending.has(id)) {
      const url = './art/' + id + '-skin.webp';
      const request = loader
        .loadAsync(url)
        .catch(() => loader.loadAsync(url))
        .then((map) => {
          map.colorSpace = THREE.SRGBColorSpace;
          images.set(id, map);
          return true;
        })
        .catch(() => false)
        .finally(() => pending.delete(id));
      pending.set(id, request);
    }
    return pending.get(id);
  }
  return { get: (id) => images.get(id), prepare };
}
// Register the artist's frontal lighting and markings on the model in bind pose.
// The UVs then stay attached to each individual shell plate, leg or wing as it moves.
export function coatModel(root, map, baseMaterial) {
  const mat = baseMaterial.clone(),
    all = [];
  root.updateMatrixWorld(true);
  const world = root.matrixWorld.clone().invert(),
    m = new THREE.Matrix4(),
    v = new THREE.Vector3();
  const pitch = 0.52,
    cs = Math.cos(pitch),
    sn = Math.sin(pitch);
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  root.traverse((obj) => {
    if (!obj.isMesh || obj.material !== baseMaterial) return;
    const geo = obj.geometry,
      pos = geo.getAttribute('position'),
      normal = geo.getAttribute('normal'),
      proj = new Float32Array(pos.count * 3);
    m.multiplyMatrices(world, obj.matrixWorld);
    const normalMat = new THREE.Matrix3().getNormalMatrix(m);
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(m);
      const y = v.y * cs - v.z * sn;
      minX = Math.min(minX, v.x);
      maxX = Math.max(maxX, v.x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
      proj[3 * i] = v.x;
      proj[3 * i + 1] = y;
      v.fromBufferAttribute(normal, i).applyMatrix3(normalMat).normalize();
      proj[3 * i + 2] = THREE.MathUtils.smoothstep(v.y * sn + v.z * cs, -0.34, 0.35);
    }
    all.push([geo, proj, obj]);
  });
  for (const [geo, p, obj] of all) {
    for (let i = 0; i < p.length; i += 3) {
      p[i] = 0.014 + (0.972 * (p[i] - minX)) / (maxX - minX);
      p[i + 1] = 0.015 + (0.97 * (p[i + 1] - minY)) / (maxY - minY);
    }
    geo.setAttribute('portraitUv', new THREE.BufferAttribute(p, 3));
    obj.material = mat;
  }
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.paintedSurface = { value: map };
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        '#include <common>\nattribute vec3 portraitUv;varying vec3 paintCoord;varying vec3 sculpture;',
      )
      .replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\npaintCoord=portraitUv;sculpture=position;',
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        '#include <common>\nuniform sampler2D paintedSurface;varying vec3 paintCoord;varying vec3 sculpture;',
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        vec4 skin=texture2D(paintedSurface,paintCoord.xy);
        vec3 base=diffuseColor.rgb;
        float baseL=dot(base,vec3(.26,.55,.19));float skinL=dot(skin.rgb,vec3(.26,.55,.19));
        float contrast=clamp(pow((skinL+.075)/(.27+.075),.47),.54,1.65);
        float weight=skin.a*paintCoord.z;
        diffuseColor.rgb=mix(base, mix(base*contrast,skin.rgb,.50),weight*.83);
        float grain=sin(sculpture.x*29.+sin(sculpture.y*18.))*sin(sculpture.z*24.+sculpture.y*13.);
        diffuseColor.rgb*=1.+.032*grain;`,
      );
  };
}
const vertex = `
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
  }`;
export function createPaintedBoss(kind, texture) {
  const widths = { diver: 4.0, warden: 2.79, drill: 3.13, kestrel: 4.55, engine: 4.11 };
  const width = widths[kind],
    height = (width * texture.image.height) / texture.image.width;
  const material = new THREE.ShaderMaterial({
    uniforms: {
      paint: { value: texture },
      motion: { value: new THREE.Vector4() },
      kind: { value: art.indexOf(kind) },
      fall: { value: 0 },
      bodyWidth: { value: width },
      bodyHeight: { value: height },
      hit: { value: 0 },
    },
    vertexShader: vertex,
    fragmentShader: `varying vec2 tex;uniform sampler2D paint;uniform float hit;
   void main(){vec4 p=texture2D(paint,tex);if(p.a<.27)discard;gl_FragColor=vec4(mix(p.rgb,vec3(1.,.76,.42),hit*.29),p.a);
   #include <colorspace_fragment>
   }`,
    side: THREE.DoubleSide,
    alphaToCoverage: true,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 30, 30), material);
  mesh.frustumCulled = false;
  return {
    mesh,
    pose(p) {
      const u = material.uniforms;
      u.motion.value.set(
        kind === 'kestrel' ? p.time * 5 : p.march * 5.6,
        p.walk * (1 - p.down),
        p.charge,
        p.release,
      );
      u.fall.value = p.down;
      u.hit.value = p.hit;
    },
  };
}

// A closed relief mesh preserves the silhouette of the painted creature. Thickness
// comes from both the silhouette distance and the anatomical volumes, including horns,
// claws and wing membranes. The two caps share edge vertices through a stitched rim.
const shapes = {
  diver: [
    [0.5, 0.64, 0.29, 0.27, 1.0],
    [0.2, 0.29, 0.17, 0.2, 0.82],
    [0.82, 0.28, 0.17, 0.2, 0.82],
    [0.5, 0.49, 0.15, 0.13, 0.62],
  ],
  warden: [
    [0.5, 0.7, 0.36, 0.32, 1.04],
    [0.53, 0.42, 0.22, 0.19, 0.75],
    [0.64, 0.44, 0.12, 0.19, 0.98],
    [0.24, 0.18, 0.15, 0.22, 0.59],
    [0.76, 0.18, 0.14, 0.21, 0.59],
  ],
  drill: [
    [0.36, 0.47, 0.26, 0.27, 1.02],
    [0.68, 0.27, 0.25, 0.21, 0.72],
    [0.7, 0.8, 0.25, 0.16, 0.65],
  ],
  kestrel: [
    [0.51, 0.48, 0.15, 0.27, 0.95],
    [0.5, 0.34, 0.12, 0.13, 0.82],
    [0.3, 0.18, 0.15, 0.17, 0.5],
    [0.71, 0.26, 0.14, 0.13, 0.52],
  ],
  engine: [
    [0.5, 0.6, 0.3, 0.32, 0.95],
    [0.5, 0.37, 0.18, 0.19, 0.83],
    [0.31, 0.82, 0.14, 0.18, 0.65],
    [0.69, 0.82, 0.14, 0.18, 0.65],
  ],
};
function volumeGeometry(kind, map, width, height) {
  const nx = 80,
    ny = Math.max(54, Math.round((nx * map.image.height) / map.image.width));
  const canvas = document.createElement('canvas');
  canvas.width = nx + 1;
  canvas.height = ny + 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(map.image, 0, 0, nx + 1, ny + 1);
  const data = ctx.getImageData(0, 0, nx + 1, ny + 1).data,
    size = (nx + 1) * (ny + 1);
  const distance = new Float32Array(size);
  for (let n = 0; n < size; n++) distance[n] = data[n * 4 + 3] > 88 ? 1000 : 0;
  for (let y = 1; y < ny; y++)
    for (let x = 1; x < nx; x++) {
      const k = y * (nx + 1) + x;
      distance[k] = Math.min(
        distance[k],
        distance[k - 1] + 1,
        distance[k - nx - 1] + 1,
        distance[k - nx - 2] + 1.414,
      );
    }
  for (let y = ny - 1; y > 0; y--)
    for (let x = nx - 1; x > 0; x--) {
      const k = y * (nx + 1) + x;
      distance[k] = Math.min(
        distance[k],
        distance[k + 1] + 1,
        distance[k + nx + 1] + 1,
        distance[k + nx + 2] + 1.414,
      );
    }
  const positions = [],
    uvs = [],
    faces = [],
    surface = [],
    cells = new Uint8Array(nx * ny),
    pitch = 0.64,
    c = Math.cos(pitch),
    s = Math.sin(pitch);
  for (const front of [true, false])
    for (let y = 0; y <= ny; y++)
      for (let x = 0; x <= nx; x++) {
        const k = y * (nx + 1) + x,
          u = x / nx,
          v = 1 - y / ny;
        let muscle = 0;
        for (const [cx, cy, rx, ry, depth] of shapes[kind]) {
          muscle = Math.max(
            muscle,
            depth * Math.exp(-1.6 * (((u - cx) / rx) ** 2 + ((v - cy) / ry) ** 2)),
          );
        }
        const fromEdge = Math.pow(Math.min(1, distance[k] / (nx * 0.11)), 0.6);
        const luma = (0.28 * data[k * 4] + 0.55 * data[k * 4 + 1] + 0.17 * data[k * 4 + 2]) / 255;
        const thickness =
          (0.023 + fromEdge * ((kind === 'kestrel' ? 0.085 : 0.2) + muscle * 0.86)) *
          Math.min(1.26, width / 3);
        const depth = front ? thickness * (0.87 + luma * 0.13) : -0.99 * thickness;
        // The boot plane is y=0. Body sections further up the portrait project back over the footprint.
        const vertical = v * height;
        positions.push(
          (u - 0.5) * width,
          vertical * c + depth * s + 0.025,
          0.46 - vertical * s + depth * c,
        );
        uvs.push(u, v);
        surface.push(front ? 1 : 0);
      }
  for (let y = 0; y < ny; y++)
    for (let x = 0; x < nx; x++) {
      const k = y * (nx + 1) + x;
      cells[y * nx + x] = [k, k + 1, k + nx + 1, k + nx + 2].some((i) => data[i * 4 + 3] > 80)
        ? 1
        : 0;
    }
  for (let y = 0; y < ny; y++)
    for (let x = 0; x < nx; x++) {
      if (!cells[y * nx + x]) continue;
      const a = y * (nx + 1) + x,
        b = a + 1,
        c = a + nx + 1,
        d = c + 1;
      faces.push(a, c, b, b, c, d, a + size, b + size, c + size, b + size, d + size, c + size);
      const rim = (l, r) => faces.push(l, r, l + size, r, r + size, l + size);
      if (!x || !cells[y * nx + x - 1]) rim(c, a);
      if (x === nx - 1 || !cells[y * nx + x + 1]) rim(b, d);
      if (!y || !cells[(y - 1) * nx + x]) rim(a, b);
      if (y === ny - 1 || !cells[(y + 1) * nx + x]) rim(d, c);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  g.setAttribute('surface', new THREE.Float32BufferAttribute(surface, 1));
  g.setIndex(faces);
  g.computeVertexNormals();
  return g;
}
export function createSculptedPaint(kind, texture) {
  const width = { diver: 4.12, warden: 2.9, drill: 3.15, kestrel: 4.43, engine: 4.08 }[kind];
  const height = (width * texture.image.height) / texture.image.width;
  const geom = volumeGeometry(kind, texture, width, height);
  const mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    alphaToCoverage: true,
    uniforms: {
      paint: { value: texture },
      motion: { value: new THREE.Vector4() },
      kind: { value: art.indexOf(kind) },
      fall: { value: 0 },
      bodyWidth: { value: width },
      bodyHeight: { value: height },
      hit: { value: 0 },
    },
    vertexShader: vertex
      .replace(
        'varying vec2 tex;',
        'attribute float surface;varying float cap;varying vec3 ns;varying vec2 tex;',
      )
      .replace('tex=uv;', 'tex=uv;cap=surface;ns=normalize(normalMatrix*normal);')
      .replace(
        'gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);',
        `
     vec3 sculpt=position;
     sculpt.x+=drawX*bodyWidth;sculpt.y+=drawY*bodyHeight*.84;sculpt.z-=drawY*bodyHeight*.44;
     sculpt.z+=depth+foot*base*walk*.16;
     if(kind>1.5 && kind<2.5){float jaw=(1.-smoothstep(.12,.24,abs(x+.12)))*(1.-smoothstep(.11,.23,abs(y-.30)));sculpt.y-=jaw*(windup*.10+act*.15);}
     if(kind>2.5 && kind<3.5)sculpt.z+=edge*(.19*sin(beat)-fall*.42);
     gl_Position=projectionMatrix*modelViewMatrix*vec4(sculpt,1.);`,
      ),
    fragmentShader: `varying vec2 tex;varying float cap;varying vec3 ns;uniform sampler2D paint;uniform float hit;
     void main(){vec4 p=texture2D(paint,tex);if(p.a<.25)discard;
       float light=.86+.16*max(0.,dot(normalize(ns),normalize(vec3(-.52,.76,.56))));
       vec3 rgb=p.rgb*light*mix(.48,1.,cap);
       gl_FragColor=vec4(mix(rgb,vec3(1.,.78,.42),hit*.30),p.a);
       #include <colorspace_fragment>
     }`,
  });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.frustumCulled = false;
  return {
    mesh,
    pose(p) {
      mat.uniforms.motion.value.set(
        kind === 'kestrel' ? p.time * 5 : p.march * 5.6,
        p.walk * (1 - p.down),
        p.charge,
        p.release,
      );
      mat.uniforms.fall.value = p.down;
      mat.uniforms.hit.value = p.hit;
    },
  };
}
