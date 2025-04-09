uniform float uDelta;
uniform float uSeparationDistance;
// uniform float uAlignmentDistance;
uniform float uCohisionDistance;
uniform vec2 uResolution;
uniform float uSpeed;

#define PI 3.14159265359
#define PI2 6.28318530718
#define SPEED_LIMIT 9.0
#define BOUNDS 800

void main() {
  vec2 predator = vec2(0.0);

  float uAlignmentDistance = 100.0;

  float radius = uSeparationDistance + uAlignmentDistance + uCohisionDistance;
  float separateThreshold = uSeparationDistance / radius;
  float alignThreshold = (uSeparationDistance + uAlignmentDistance) / radius;
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
  velocity -= normalize(direction) * uDelta * uSpeed;

  float f = 0.0;

  for(float y = 0.0; y < uResolution.y; y++) {
    for(float x = 0.0; x < uResolution.x; x++) {
      vec2 refUv = vec2(x + 0.5, y + 0.5) / uResolution;
      vec3 particlePosition = texture2D(uPosition, refUv).xyz;

      vec3 particleDir = particlePosition - position;
      float particleDist = length(particleDir);
      if(particleDist < 0.0001) {
        continue;
      }

      float particleDistSq2 = particleDist * particleDist;
      float percent = particleDistSq2 / radiusSq2;

      if (percent < alignThreshold) {
        // Align particles to the same direction
        float adjusted = percent / alignThreshold;
        vec3 eachVelocity = texture2D(uVelocity, refUv).xyz;

        f = (0.5 - cos(adjusted * PI2) * 0.5 + 0.5) * uDelta * uSpeed;
        velocity += normalize(eachVelocity) * f;
      }
    }
  }


  gl_FragColor = vec4(velocity, 1.0);
}