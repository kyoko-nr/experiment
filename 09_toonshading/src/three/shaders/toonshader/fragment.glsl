uniform sampler2D uTexture;

varying vec3 vNormal;
varying vec3 vPosition;

vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower)
{
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

  vec3 light = directionalLight(
    vec3(1.0, 1.0, 1.0),
    1.0,
    vNormal,
    vec3(0.5, 1.0, 0.0),
    viewDirection,
    10.0
  );

  float diffuse = clamp(dot(vNormal, light), 0.0, 1.0);

  vec3 tex = texture2D(uTexture, vec2(diffuse)).rgb;

  gl_FragColor = vec4(tex, 1.0);
}