varying vec2 vUv;
uniform vec3 position;
uniform vec2 uv;
uniform vec4 projectionMatrix;
uniform vec4 modelViewMatrix;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}