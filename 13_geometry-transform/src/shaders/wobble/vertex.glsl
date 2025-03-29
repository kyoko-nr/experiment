uniform float uTime;

#include "../includes/simplexNoise4d.glsl"

void main() {
  float t = simplexNoise4d(vec4(csm_Position, uTime * 0.5)) * 0.3;
  csm_Position += t * normal;
}