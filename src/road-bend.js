import * as THREE from 'three';

// The simulation measures distances along the deck. All world art, including
// instanced and billboard shaders, shares this projection of that road space.
const routes = {
  timber: [1.85, 0.077],
  quarry: [3.35, 0.105],
  forge: [3.7, 0.084],
  ice: [4.05, 0.069],
  cinder: [3.8, 0.119],
};
const straight = [0, 0];
export const roadCurveGLSL = `
  uniform vec4 roadCurve;
  float lateralBend(float z){
    float offset = roadCurve.x * (cos(roadCurve.z - z * roadCurve.y) - roadCurve.w)
                 * smoothstep(5.0, 21.0, -z);
    float limit = max(0.6, -z * 0.18 - 0.8);
    return offset * inversesqrt(1.0 + (offset / limit) * (offset / limit));
  }`;
const wrapped = new WeakSet();
const viewUniforms = new WeakMap();

function wrapMaterial(material) {
  if (wrapped.has(material) || material.userData.unbent) return;
  wrapped.add(material);
  const original = material.onBeforeCompile;
  const program = material.customProgramCacheKey();
  material.customProgramCacheKey = () => program + '-road-bend';
  material.onBeforeCompile = function (shader, renderer) {
    original.call(this, shader, renderer);
    Object.assign(shader.uniforms, viewUniforms.get(renderer));
    // Recover road z from clip position. This runs after skinning, instancing
    // and the custom character, sprite and tracer vertex animation paths.
    const bend =
      'if (roadCurve.x != 0.0) gl_Position += roadRight * lateralBend(dot(roadDepth, gl_Position));';
    let source = shader.vertexShader;
    if (source.includes('#include <project_vertex>'))
      source = source.replace('#include <project_vertex>', '#include <project_vertex>\n' + bend);
    else
      source = source.replace(/gl_Position\s*=[^;]+;/g, (projection) => projection + '\n' + bend);
    shader.vertexShader = roadCurveGLSL + '\nuniform vec4 roadDepth, roadRight;\n' + source;
  };
  material.needsUpdate = true;
}

export function createRoadBend(renderer, scene) {
  const curve = new THREE.Vector4();
  const right = new THREE.Vector4(),
    depth = new THREE.Vector4();
  const vp = new THREE.Matrix4();
  viewUniforms.set(renderer, {
    roadCurve: { value: curve },
    roadRight: { value: right },
    roadDepth: { value: depth },
  });
  let lastChildStamp = -1;
  let forceScan = true;
  function prepare(mesh) {
    if (!mesh.material) return;
    if (Array.isArray(mesh.material)) mesh.material.forEach(wrapMaterial);
    else wrapMaterial(mesh.material);
    // 弯道着色器会横向偏移顶点，关闭 CPU 视锥剔除避免弯道边缘被误裁
    mesh.frustumCulled = false;
  }
  function scanNode(node) {
    if (!node) return;
    node.traverse(prepare);
  }
  return {
    /** 仅在场景结构发生变化或被显式标脏时扫描绑定弯道材质，避免每帧全树遍历 */
    markDirty() {
      forceScan = true;
    },
    scanNode,
    prepareScene() {
      // 快速检测顶层及主要分组的子节点数量变化，兼顾动态懒加载的 Boss/地形节点
      let stamp = scene.children.length;
      for (let i = 0; i < scene.children.length; i++) {
        const c = scene.children[i];
        stamp = (stamp * 31 + c.children.length + (c.visible ? 1 : 0)) | 0;
      }
      if (!forceScan && stamp === lastChildStamp) return;
      lastChildStamp = stamp;
      forceScan = false;
      scene.traverseVisible(prepare);
    },
    setRoute(theme, stage, distance) {
      const [radius, frequency] = routes[theme] || straight;
      const phase = distance * frequency + (stage % 5) * 0.69 + 0.63;
      curve.set(radius, frequency, phase, Math.cos(phase));
    },
    offset(z) {
      const offset =
        curve.x *
        (Math.cos(curve.z - z * curve.y) - curve.w) *
        THREE.MathUtils.smoothstep(-z, 5, 21);
      const limit = Math.max(0.6, -z * 0.18 - 0.8);
      return offset / Math.hypot(1, offset / limit);
    },
    setCamera(camera) {
      vp.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
      right.fromArray(vp.elements, 0);
      const e = vp.invert().elements;
      depth.set(e[2], e[6], e[10], e[14]);
    },
    curve,
  };
}
