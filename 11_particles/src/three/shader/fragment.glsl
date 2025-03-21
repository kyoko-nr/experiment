uniform vec3 uPointColor;
uniform vec3 uTargetPointColor;
uniform float uPointColorProgress;

void main() {
  vec2 uv = gl_PointCoord;
  float distanceToCenter = length(uv - 0.5);
  float alpha = 0.03 / distanceToCenter - 0.1;

  vec3 color = mix(uPointColor, uTargetPointColor, uPointColorProgress);

  gl_FragColor = vec4(color, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}