attribute vec4 tangent;

uniform float uElapsedT;
uniform float uFrequency;
uniform float uAmplitude;

#include "./noise3D.glsl"

const float shift = 0.01;

float calcNoisePos(vec3 pos) {
    vec3 noisePos = pos * uFrequency + vec3(0.0, uElapsedT * uFrequency, 0.0);
    float noise = snoise(noisePos);
    return noise * uAmplitude;
}

vec3 calcNormal(vec3 pos, vec3 norm, vec3 tang) {
    vec3 biTangent = cross(norm, tang);
    vec3 posA = pos + tang * shift;
    vec3 posB = pos + biTangent * shift;
    posA += norm * calcNoisePos(posA);
    posB += norm * calcNoisePos(posB);
    vec3 toA = normalize(posA - pos);
    vec3 toB = normalize(posB - pos);
    return cross(toA, toB);
}

void main() {
    vec3 pos = csm_Position;
    vec3 nrm = normalize(normal);
    vec3 tang = normalize(tangent.xyz);
    
    float noise = calcNoisePos(pos);
    csm_Position = pos + nrm * noise;
    // csm_Normal = calcNormal(pos, nrm, tang);
    csm_Normal = nrm;
}
