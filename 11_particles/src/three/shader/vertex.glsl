uniform float uPointSize;
uniform vec2 uResolution;
uniform float uTime;
uniform float uIndex;

// uniform vec3 mouse;
// uniform float mouseRadius;
// uniform float returnSpeed;
// uniform float interaction;

// attribute vec3 initialPosition;

#include "./includes/simplexNoise3d.glsl"

void main() {
    vec3 pos = position;
    float noiseX = simplexNoise3d(vec3(pos.x));
    float noiseY = simplexNoise3d(vec3(pos.y));
    float animX = cos(uTime + noiseX * 10.0);
    float animY = sin(uTime + noiseY * 10.0);
    pos.x += noiseY * 0.15 + animY * 0.2;
    pos.y += noiseX * 0.15 + animX * 0.2;





    // vec3 pos = initialPosition;
    // float loopTime = mod(time, 3.0);

    // // Firefly-like animation ⭐️
    // vec3 fireflyOffset = vec3(
    //     sin(time * 1.5 + initialPosition.x * 5.0) * 0.1,
    //     cos(time * 2.0 + initialPosition.y * 5.0) * 0.1,
    //     sin(time * 1.8 + initialPosition.z * 5.0) * 0.1
    // );
    // pos += fireflyOffset;

    // if (loopTime < 1.0) { // Sphere
        // float pulse = sin(time * 2.0) * 0.1; // ⭐️ Pulsating effect
        // pos = initialPosition * (1.0 + pulse); // ⭐️ Pulsating effect
    // } else if (loopTime < 2.0) { // Sine wave
        // float wave = sin(pos.x * 5.0 + loopTime * 5.0); // ⭐️ Use loopTime
        // pos.y += wave * 0.5 + (sin(pos.z * 5.0 + loopTime * 3.0) * .2); // ⭐️ Use loopTime
        // pos.z += (cos(pos.x * 7.0 + loopTime * 4.0) * .2); // ⭐️ Use loopTime
    // } else { // Cloud
        // pos.x += sin(pos.y * 3.0 + loopTime * 2.0) * 0.2; // ⭐️ Use loopTime
        // pos.y += cos(pos.z * 3.0 + loopTime * 1.5) * 0.2; // ⭐️ Use loopTime
        // pos.z += sin(pos.x * 3.0 + loopTime * 2.5) * 0.2; // ⭐️ Use loopTime
    // }

    // Mouse interaction
    // float dist = distance(pos, mouse);
    // if (dist < mouseRadius && interaction > 0.0) {
    //     vec3 direction = normalize(pos - mouse);
    //     pos += direction * (mouseRadius - dist);
    // } else {
    //     pos = mix(pos, initialPosition, returnSpeed * (dist/10.0) * clamp(time-1.0, 0.0, 1.0)); // Return over time
    // }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uPointSize * 0.1 * uResolution.y;
}