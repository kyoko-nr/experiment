uniform vec3 uLightDir;
uniform vec3 uLightColor;
uniform vec3 uShadowColor;

varying vec3 vNormalW;

void main() {
    vec3 norm = normalize(vNormalW);
    vec3 light = normalize(uLightDir);

    #ifdef GL_OES_standard_derivatives
        // WebGL1 でも gl_FrontFacing は使えます
    #endif
        norm *= (gl_FrontFacing ? 1.0 : -1.0); 

    float ndl = min(max(dot(norm, light), 0.0) * 2.5, 1.0);

    vec3 color = mix(uLightColor, uShadowColor, ndl);
    csm_DiffuseColor = vec4(color, 1.0);
}