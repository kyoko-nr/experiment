uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec2 vUv;

void main() {
  vec3 mixed = mix(uColor1, uColor2, vUv.y);
  vec3 white = vec3(1.0, 1.0, 1.0);
  vec3 finalColor = mix(mixed, white, 0.5);
  csm_DiffuseColor = vec4(finalColor, 1.0);
}