uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uMouseSpeed;
uniform float uTime;

varying vec2 vUv;

float gridScale = 50.0;
float randomMagnitude = 0.1;
float influenceDistance = 20.0;

float getMouseInfluence(vec2 st, vec2 mouseCoord, vec2 scale) {
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

// void main() {
//   vec2 st = gl_FragCoord.xy / uResolution.xy;

//   // add random offset to mouse position
//   vec2 gridCoord = floor(st * gridScale);
//   float offsetX = random(gridCoord.xy) * randomMagnitude;
//   float ofsetY = random(gridCoord.yx) * randomMagnitude;
//   vec2 mouse = uMouse + vec2(offsetX, ofsetY);
//   // mouse = uMouse;

//   // expand mouse influence to 20x20 grid
//   float incluence = getMouseInfluence(st, mouse, vec2(gridScale));
//   float scale = mix(1.0, 1.5, incluence);

//   vec2 multiplier = vec2(1.0);
//   if(vUv.x < mouse.x) {
//     multiplier.x = -1.0;
//   }
//   if(vUv.y < mouse.y) {
//     multiplier.y = -1.0;
//   }

//   vec2 scaledUv = vUv / scale;

//   // vec2 center = vec2(0.5);
//   // vec2 scaledUv = (vUv - center) / scale + center;
//   vec4 texel = texture2D(tDiffuse, scaledUv);
//   gl_FragColor = texel;

//   #include <tonemapping_fragment>
//   #include <colorspace_fragment>
// }

float radius = 0.5;
float PI = 3.14159265;

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  vec2 mouse = uMouse;

  vec2 diff = st - mouse;
  float dist = distance(st, mouse);

  vec2 scaledUv = vUv;

  if(dist < radius) {
    float scale = (1.0 - cos(dist / radius * PI * 0.5));
    scaledUv = (mouse + normalize(diff) * radius * scale) / vec2(2.0, 2.0);
  }

  float circle = smoothstep(0.0, radius, dist);

  vec4 blue = vec4(0.0, 0.2, 0.8, 1.0);
  vec4 texel = texture2D(tDiffuse, scaledUv);
  texel = mix(blue, texel, circle);
  gl_FragColor = texel;

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}