varying vec2 vUv;
uniform float uTime;

float PI = 3.1415926535897932384626433832795;

void main()
{
  vUv = uv;

  vec3 pos = position;

  float offset = 0.01;
  float freq = 1.0;
  float amp = 0.1;
  float x = pos.x + sin(pos.y * offset + uTime * freq * PI) * amp;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( vec3(x, pos.y, pos.z), 1.0);
}
