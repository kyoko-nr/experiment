uniform sampler2D uTexture;
uniform vec3 uLightPosition;
uniform vec3 uColor;
uniform vec2 uResolution;
uniform vec3 uHalftoneColor;
uniform vec3 uHalftonePosition;

varying vec3 vNormal;
varying vec3 vPosition;

float drawCircle(vec2 uv, float radius) {
    float dist = distance(uv, vec2(0.5));
    return 1.0 - step(0.5 * radius, dist);
}

vec3 halftone(
    vec3 color,
    float repetitions,
    vec3 direction,
    float low,
    float high,
    vec3 pointColor,
    vec3 normal
) {
    float intensity = dot(normal, direction);
    intensity = smoothstep(low, high, intensity);
    vec2 uv = gl_FragCoord.xy / uResolution.y;
    uv *= repetitions;
    uv = mod(uv, 1.0);
    float circle = drawCircle(uv, intensity);
    return mix(color, pointColor, circle);
}

vec3 directionalLight(
  vec3 lightColor,
  float lightIntensity,
  vec3 normal,
  vec3 lightPosition,
  vec3 viewDirection,
  float specularPower) {
    vec3 lightDirection = normalize(lightPosition);
    vec3 lightReflection = reflect(- lightDirection, normal);

    // Shading
    float shading = dot(normal, lightDirection);
    shading = max(0.0, shading);

    // Specular
    float specular = - dot(lightReflection, viewDirection);
    specular = max(0.0, specular);
    specular = pow(specular, specularPower);

    return lightColor * lightIntensity * (shading + specular);
}

void main() {
  vec3 viewDirection = normalize(vPosition - cameraPosition);
  vec3 normal = normalize(vNormal);

  // Toon shading
  vec3 light = directionalLight(
    vec3(1.0),
    1.0,
    vNormal,
    uLightPosition,
    viewDirection,
    10.0
  );
  float diffuse = clamp(dot(normal, light), 0.0, 1.0);
  vec3 color = texture2D(uTexture, vec2(diffuse)).rgb;
  color *= uColor;

  // Halftone
  color = halftone(
    color,
    50.0,
    uHalftonePosition,
    -0.8,
    1.5,
    uHalftoneColor,
    normal
  );

  gl_FragColor = vec4(color, 1.0);
}