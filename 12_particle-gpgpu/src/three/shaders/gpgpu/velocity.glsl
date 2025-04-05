uniform float uDelta;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 position = texture2D(uPosition, uv).xyz;
  vec3 velocity = texture2D(uVelocity, uv).xyz;

  position += velocity * uDelta * 15.0;

  gl_FragColor = vec4(position, 1.0);
}