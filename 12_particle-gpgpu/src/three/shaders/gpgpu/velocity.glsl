uniform float uDelta;
uniform float uSeparationDistance;
uniform float uAlighmentDistance;
uniform float uCohisionDistance;

#define PI 3.14159265359
#define PI2 6.28318530718
#define SPEED_LIMIT 9.0
#define BOUNDS 800

void main() {
  vec2 predator = vec2(0.0);

  float radius = uSeparationDistance + uAlighmentDistance + uCohisionDistance;
  float separateThreshold = uSeparationDistance / radius;
  float alignThreshold = (uSeparationDistance + uAlighmentDistance) / radius;
  float radiusSq2 = radius * radius;
  float separateThresholdSq2 = separateThreshold * separateThreshold;
  float cohisionDistanceSq2 = uCohisionDistance * uCohisionDistance;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 position = texture2D(uPosition, uv).xyz;
  vec3 velocity = texture2D(uVelocity, uv).xyz;

  vec3 direction = vec3(0.0);
  float dist = 0.0;

  // Move away from predator
  // vec3 direction = predator * BOUNDS - position;
  // direction.z = 0.0;
  // float dist = length(direction);
  // distSq2 = dist * dist;

  // Attract to the center
  vec3 center = vec3(0.0);
  direction = position - center;
  dist = length(direction);

  direction.y *= 1.5;
  velocity -= normalize(direction) * uDelta * 2.0;


  gl_FragColor = vec4(velocity, 1.0);
}