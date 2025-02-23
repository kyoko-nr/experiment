uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uMouseSpeed;

varying vec2 vUv;

float radius = 0.5;
float PI = 3.14159265;

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  vec2 mouse = uMouse;

  // Fish eye effect
  vec2 diff = st - mouse;
  float dist = distance(st, mouse);
  vec2 scaledUv = vUv;
  radius *= uMouseSpeed;
  if(dist < radius) {
    float scale = (1.0 - cos(dist / radius * PI * 0.5));
    scaledUv = (mouse + normalize(diff) * radius * scale) / vec2(2.0, 2.0);
  }

  vec4 texel = texture2D(tDiffuse, scaledUv);
  gl_FragColor = texel;

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}