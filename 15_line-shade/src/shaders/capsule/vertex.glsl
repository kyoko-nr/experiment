uniform int uDeformType; // 0: wave, 1: churros
uniform float uFrequency;
uniform float uWaveAmplitude;

varying vec3 vNormalW;

const float e = 0.0008;

#include "./wave.glsl"
#include "./churros.glsl"
#include "./calcnorm.glsl"

void main() {
  vec3 result;
  vec3 norm;
  if (uDeformType == 0) {
    result = wave(csm_Position, uFrequency, uWaveAmplitude);
    mat3 jacobian = jacobianWave(csm_Position, result, e, uFrequency, uWaveAmplitude);
    norm = calcNorm(jacobian, normal);
  } else {
    result = churros(csm_Position);
    mat3 jacobian = jacobianChurros(csm_Position, result, e);
    norm = calcNorm(jacobian, normal);
  }
  csm_Position = result;
  csm_Normal = norm;

  vNormalW = normalize(mat3(modelMatrix) * norm);
}
