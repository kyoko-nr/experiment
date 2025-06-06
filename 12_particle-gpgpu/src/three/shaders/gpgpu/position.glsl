uniform float uDelta;
uniform float uSpeed;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 position = texture2D(uPosition, uv).xyz;
  position += uDelta * 0.2;
  vec3 velocity = texture2D(uVelocity, uv).xyz;

  gl_FragColor = vec4(position + velocity * uDelta * uSpeed, 1.0);
}