uniform vec3 uLightDir;
uniform vec3 uLightColor;
uniform vec3 uShadowColor;

varying vec3 vNormalW;
varying vec3 vWorldPos;

void main() {
    // vec3 norm = normalize(cross(dFdx(vWorldPos), dFdy(vWorldPos)));
    vec3 norm = normalize(vNormalW);
    vec3 light = normalize(uLightDir);
    // float ndl = max(dot(norm, light), 0.0) * 5.0;
    // ndl = smoothstep(ndl, 0.0, 1.0);
    float ndl = min(max(dot(norm, light), 0.0) * 2.5, 1.0);

    vec3 color = mix(uLightColor, uShadowColor, ndl);
    csm_DiffuseColor = vec4(color, 1.0);
}