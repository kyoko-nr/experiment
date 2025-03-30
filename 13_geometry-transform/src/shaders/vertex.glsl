uniform float uTime;
uniform float uSpeed;
uniform float uWaveStrength;
uniform float uWaveFrequency;
uniform float uTwistFrequency;

varying vec2 vUv;

#include "./includes/simplexNoise4d.glsl"

void main() {
  float time = uTime * uSpeed;
  float wave = simplexNoise4d(vec4(vec3((csm_Position.x + time) * uWaveFrequency), time)) * uWaveStrength;
  csm_Position += wave * normal;

  float radius = 0.2;
  vec2 center = vec2(0.5);
  float len = length(csm_Position.xz * 1.5 - center);
  csm_Position.x += sin(csm_Position.y * len * uTwistFrequency + time) * radius;
  csm_Position.z += cos(csm_Position.y * len * uTwistFrequency + time) * radius;

  vUv = uv;
}