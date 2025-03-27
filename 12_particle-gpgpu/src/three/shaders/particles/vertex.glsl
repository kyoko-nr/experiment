varying vec3 vColor;

void main() {
  // Final position
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  gl_PointSize = 20.0;
  gl_PointSize *= (1.0 / - viewPosition.z);

  vColor = vec3(1.0, 0.0, 0.0);
}