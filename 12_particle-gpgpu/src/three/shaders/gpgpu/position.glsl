uniform float uDelta;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 position = texture2D(uPosition, uv).xyz;
  position += uDelta * 0.2;

  gl_FragColor = vec4(position, 1.0);
}