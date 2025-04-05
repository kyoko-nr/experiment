void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 position = texture2D(uPosition, uv);

  gl_FragColor = position;
}