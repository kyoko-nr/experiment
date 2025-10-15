uniform vec3 uLightDir;
uniform vec3 uLightColor;
uniform vec3 uShadowColor;

varying vec3 vNormalW;

void main() {
    vec3 norm = normalize(vNormalW);
    vec3 light = normalize(uLightDir);
    float ndl = dot(norm, light);

    vec3 color = mix(uShadowColor, uLightColor, ndl);
    csm_DiffuseColor = vec4(color, 1.0);
}