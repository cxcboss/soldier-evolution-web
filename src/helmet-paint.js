// Grade only the colored enamel above the brow. Work in linear RGB so the
// original rim, white insignia, specular highlights and fabric values survive.
export const helmetPaintGLSL = `
  vec3 paintHelmet(vec3 color, float height, bool enemy) {
    float crown = smoothstep(.64, .76, height);
    float pigment = enemy ? color.r : color.b;
    float other = enemy ? max(color.g, color.b) : color.r;
    float chroma = (pigment - other) / max(.015, pigment);
    float mask = crown * smoothstep(.32, .75, chroma);
    vec3 lacquer;
    if (enemy) {
      lacquer = vec3(color.r + .42 * color.r * (1. - color.r), color.g * .80, color.b * .86);
    } else {
      lacquer = vec3(color.r * .87, color.g + .21 * color.b * (1. - color.g),
                     color.b + .54 * color.b * (1. - color.b));
    }
    return mix(color, lacquer, mask);
  }
`;
