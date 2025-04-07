uniform float uDelta;
uniform float uSeparationDistance;
uniform float uAlighmentDistance;
uniform float uCohisionDistance;

#define PI 3.14159265359;
#define PI2 6.28318530718;

void main() {
  float radius = uSeparationDistance + uAlighmentDistance + uCohisionDistance;
  float separateThreshold = uSeparationDistance / radius;
  float alignThreshold = (uSeparationDistance + uAlighmentDistance) / radius;
  float radiusSq2 = radius * radius;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 position = texture2D(uPosition, uv).xyz;
  vec3 velocity = texture2D(uVelocity, uv).xyz;

  vec3 newPosition = position + velocity * uDelta * 15.0;

  gl_FragColor = vec4(newPosition, 1.0);
}