uniform sampler2D tDiffuse;
// uniform sampler2D uNoise;
// uniform float uTime;
varying vec2 vUv;

void main() {
  // vec2 waveUv = vUv + uTime * 0.01;
  // vec4 noise = texture2D(uNoise, waveUv);
  // vec2 newUv = vec2(noise.r * 0.02 + vUv.x, vUv.y + noise.g * 0.02);
  vec4 texel = texture2D( tDiffuse, vUv);
  gl_FragColor = texel;
}