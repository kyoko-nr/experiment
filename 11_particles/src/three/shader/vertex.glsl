uniform float uPointSize;
uniform vec2 uResolution;
uniform float uTime;
uniform float uPositionProgress;

attribute float aRandom;
attribute vec3 aTargetPosition;

#include "./includes/simplexNoise3d.glsl"

void main() {
    vec3 pos = position;
    vec3 targetPos = aTargetPosition;
    pos = mix(pos, targetPos, uPositionProgress);

    float noise = simplexNoise3d(vec3(pos));
    float time = uTime * aRandom;
    float animX = cos(time + noise * 10.0);
    float animY = sin(time + noise * -10.0);
    pos.x += animY * 0.2;
    pos.y += animX * 0.2;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uPointSize * 0.1 * uResolution.y;
}