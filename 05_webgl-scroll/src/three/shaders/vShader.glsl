varying vec2 vUv;
uniform float uAmount;

float PI = 3.1415926535897932384626433832795;

void main()
{
  vUv = uv;

  vec3 pos = position;

  // horizontal shift
  float amp = 0.02;
  float freq = 0.03 * uAmount;
  // vertical shift
  float tension = -0.001 * uAmount;

  float x = pos.x + sin(pos.y * PI * freq) * amp;
  float y = pos.y + cos(pos.x * PI) * tension;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( vec3(x, y, pos.z), 1.0);
}
