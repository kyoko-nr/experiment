uniform sampler2D uPositionTexture;
uniform sampler2D uVelocityTexture;

attribute float aSize;
attribute vec2 aUv;

varying vec3 vColor;

void main() {
  vec4 positionTex = texture2D(uPositionTexture, aUv);

  // Final position
  vec4 modelPosition = modelMatrix * vec4(positionTex.xyz, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  // projectedPosition.x += positionTex.x;
  gl_Position = projectedPosition;

  gl_PointSize = 10.0 * aSize;
  // gl_PointSize *= (1.0 / - viewPosition.z);

  vColor = vec3(1.0, 0.2, 0.2);
}