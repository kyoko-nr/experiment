uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uProgress;

float gridScale = 80.0;
float randomMagnitude = 0.1;
// Influence magnitude around the mouse.
// Larger values will narrow  the influence area.
float influenceMagnitude = 5.0;

// returns 0.0 to 1.0 value.
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;

  // Get the grid cell coordinates
  vec2 gridCoord = floor(st * gridScale) / gridScale;
  // Get mouse influence area with some randomeness
  float mouseInfluence = distance(gridCoord, uMouse) * influenceMagnitude;
  mouseInfluence += random(gridCoord.xy) * randomMagnitude;
  mouseInfluence = 1.0 - mouseInfluence;
  mouseInfluence = clamp(mouseInfluence * 4.0, 0.0, 1.0);
  mouseInfluence *= uProgress;

  vec4 texel = texture2D(tDiffuse, st);
  vec4 gridTexel = texture2D(tDiffuse, gridCoord);
  texel = mix(texel, gridTexel, mouseInfluence);

  gl_FragColor = texel;

  // color debug
  // gl_FragColor = vec4(mouseInfluence, mouseInfluence, mouseInfluence, 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}