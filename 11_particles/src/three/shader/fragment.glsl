uniform float time;

void main() {
  // vec3 color = vec3(0.3 + sin(time * 2.0) * 0.2, 0.5 + cos(time * 3.0) * 0.2, 0.8 + sin(time * 4.0) * 0.2);
  //   // gl_FragColor = vec4(color, 1.0);

  // vec2 uv = gl_PointCoord;
  // float distanceToCenter = length(uv - 0.5);
  // float alpha = 0.05 / distanceToCenter - 0.1;

  gl_FragColor = vec4(1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}