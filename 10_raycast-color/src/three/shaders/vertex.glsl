uniform sampler2D uTexture;

void main() {
  // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec3 newPosition = position;

  vec3 distortionDir = vec3(0.0, 0.0, 1.0);
  float intensity = texture2D(uTexture, uv).r;
  distortionDir *= intensity;

  newPosition += distortionDir;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}