varying vec2 vUv;
uniform float uTime;

void main()
{
  vUv = uv;

  vec3 pos = position;

  float speed = 3.0;
  float freq = 4.0;
  float amp = 0.02;
  float x = pos.x + sin((uTime * speed) + (pos.y * freq)) * amp;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( vec3(x, pos.y, pos.z), 1.0);
}
