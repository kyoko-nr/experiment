uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uMouseSpeed;
uniform float uTime;

varying vec2 vUv;

bool isUnderMouse(vec2 st, vec2 mouseCoord, vec2 scale) {
  // float aspect = uResolution.x / uResolution.y;
  // vec2 adjustedScale = vec2(scale.x * aspect, scale.y);
  // vec2 size = vec2(1.0) / scale;
  vec2 gridCoord = floor(st * scale);
  vec2 size = vec2(1.0) / scale;
  return abs(gridCoord.x - floor(mouseCoord.x * scale.x)) < size.x &&
          abs(gridCoord.y - floor(mouseCoord.y * scale.y)) < size.y;
}

// float getMouseInfluence(vec2 st, vec2 mouseCoord, vec2 scale) {
//   bool isUnder = isUnderMouse(st, mouseCoord, scale);
//   if (isUnder) return 1.0;

//   // Calculate distance-based influence
//   float maxDistance = 0.2; // Adjust this value to control the fade radius
//   float dist = distance(st, mouseCoord);
//   float influence = 1.0 - smoothstep(0.0, maxDistance, dist);

//   return influence;
// }

float getMouseInfluence(vec2 st, vec2 mouseCoord, vec2 scale) {
    // Get the grid cell coordinates
    vec2 gridCoord = floor(st * scale);
    vec2 mouseGridCoord = floor(mouseCoord * scale);
    
    // Calculate Manhattan distance in grid space
    vec2 gridDist = abs(gridCoord - mouseGridCoord);
    float gridDistance = max(gridDist.x, gridDist.y); // Use max for diamond-shaped influence
    
    // Convert to 0-1 range with smooth falloff
    float maxGridDistance = 5.0;
    float influence = 1.0 - smoothstep(0.0, maxGridDistance, gridDistance);
    
    return influence;
}

// returns 0.0 to 1.0 value.
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float GRID_SCALE = 20.0;

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;

  // add random offset to mouse position
  vec2 gridCoord = floor(st * GRID_SCALE);
  float offsetX = random(gridCoord.xy) * 0.05;
  float ofsetY = random(gridCoord.yx) * 0.05;
  vec2 mouse = uMouse + vec2(offsetX, ofsetY);

  // expand mouse influence to 20x20 grid
  float incluence = getMouseInfluence(st, mouse, vec2(GRID_SCALE));


  vec4 originalColor = texture2D(tDiffuse, vUv);
  vec4 blueColor = vec4(0.0, 1.0, 1.0, 1.0);
  
  // Mix between original texture and blue based on mouse influence
  vec4 texel = mix(originalColor, blueColor, incluence);
  gl_FragColor = texel;

  // vec4 texel = underMouse ? vec4(0.0, 1.0, 1.0, 1.0) : texture2D( tDiffuse, vUv);
  // gl_FragColor = texel;
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}