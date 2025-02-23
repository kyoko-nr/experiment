uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uMouseSpeed;

varying vec2 vUv;

float gridScale = 100.0;
float randomMagnitude = 0.1;
float influenceDistance = 20.0;

float getGlitchInfluence(vec2 st, vec2 mouseCoord, vec2 scale) {
  // Get the grid cell coordinates
  vec2 gridCoord = floor(st * scale);
  vec2 mouseGridCoord = floor(mouseCoord * scale);

  // Calculate Manhattan distance in grid space
  vec2 gridDist = abs(gridCoord - mouseGridCoord);
  float gridDistance = max(gridDist.x, gridDist.y); // Use max for diamond-shaped influence

  float influence = 1.0 - smoothstep(0.0, influenceDistance, gridDistance);

  return influence;
}

// returns 0.0 to 1.0 value.
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  // TODO uResolutionとuMouseが合わない。
  vec2 st = gl_FragCoord.xy / uResolution.xy / 2.0;

  // add random offset to mouse position
  vec2 gridCoord = floor(st * gridScale) / gridScale;
  // float offsetX = random(gridCoord.xy) * randomMagnitude;
  // float ofsetY = random(gridCoord.yx) * randomMagnitude;
  // vec2 mouse = uMouse + vec2(offsetX, ofsetY);
  // mouse = uMouse;

  // // expand mouse influence to 20x20 grid
  // float incluence = getGlitchInfluence(st, mouse, vec2(gridScale));
  // float scale = mix(1.0, 1.5, incluence);
  // vec2 scaledUv = vUv / scale;

  vec4 texel = texture2D(tDiffuse, gridCoord);
  // vec4 texel = texture2D(tDiffuse, vUv);

  // float dist = distance(st, uMouse);
  // vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
  // texel = mix(texel, blue, dist);


  gl_FragColor = texel;

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}