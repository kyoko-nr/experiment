uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

varying vec2 vUv;

bool isUnderMouse(vec2 st, vec2 mouseCoord, vec2 scale) {
  // float aspect = uResolution.x / uResolution.y;
  // vec2 adjustedScale = vec2(scale.x * aspect, scale.y);
  // vec2 size = vec2(1.0) / scale;
  vec2 gridCoord = floor(st * scale);
  vec2 size = vec2(1.0) / scale;
  return abs(gridCoord.x - floor(mouseCoord.x * scale.x)) < size.x &&
          abs(gridCoord.y - floor(mouseCoord.y * scale.y)) < size.y;
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;

  bool underMouse = isUnderMouse(st, uMouse, vec2(20.0));

  vec4 texel = underMouse ? vec4(0.0, 1.0, 1.0, 1.0) : texture2D( tDiffuse, vUv);
  gl_FragColor = texel;
}