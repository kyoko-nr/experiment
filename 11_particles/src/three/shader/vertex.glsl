uniform float uPointSize;
uniform vec2 uResolution;
uniform float uTime;
uniform float uPositionProgress;

attribute float aRandom;
attribute vec3 aTargetPosition;

#include "./includes/simplexNoise3d.glsl"

float planeMoveIntensity = 0.2;
float sphereMoveIntensity = 0.03;

void main() {
    vec3 pos = position;
    vec3 targetPos = aTargetPosition;
    pos = mix(pos, targetPos, uPositionProgress);

    float moveIntensity = mix(planeMoveIntensity, sphereMoveIntensity, uPositionProgress);

    float noise = simplexNoise3d(vec3(pos));
    float time = uTime * aRandom;
    float animX = cos(time + noise * 10.0);
    float animY = sin(time + noise * -10.0);
    pos.x += animY * moveIntensity;
    pos.y += animX * moveIntensity;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uPointSize * 0.1 * uResolution.y;
}