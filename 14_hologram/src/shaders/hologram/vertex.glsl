
varying vec3 vPosition;
varying vec3 vNormal;

// returns 0.0 to 1.0 value.
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // csm_Position.xyz = projectionMatrix * viewMatrix * modelPosition;

  vPosition = position;
  vec4 newNormal = modelMatrix * vec4(normal, 0.0);
  vNormal = newNormal.xyz;
}