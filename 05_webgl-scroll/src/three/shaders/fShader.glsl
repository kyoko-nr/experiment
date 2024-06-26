varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uImageAspect;
uniform float uPlaneAspect;
uniform float uAmount;

float COLOR_SHIFT = 0.0015;

void main() {
  vec2 ratio = vec2(
    min(uPlaneAspect / uImageAspect, 1.0),
    min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
  );

  vec2 fixedUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );

  vec2 offset = vec2(0.0, uAmount * COLOR_SHIFT);
  float r = texture2D(uTexture, fixedUv + offset).r;
  float g = texture2D(uTexture, fixedUv + offset * 0.5).g;
  float b = texture2D(uTexture, fixedUv + offset).b;
  vec3 texture = vec3(r, g, b);

  gl_FragColor = vec4(texture, 1.0);
}