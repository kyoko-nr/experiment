uniform int uDeformType; // 0: wave, 1: churros, 2: helix
uniform float uWaveFrequency;
uniform float uWaveAmplitude;
uniform float uHelixFrequency;
uniform float uHelixAmplitude;
uniform float uHelixRadius;
uniform float uHelixPitch;
uniform vec3 uRotation;

varying vec3 vNormalW;

const float e = 0.0008;

#include "./wave.glsl"
#include "./churros.glsl"
#include "./helix.glsl"
#include "./rotateXYZ.glsl"
#include "./calcnorm.glsl"

void main() {
  vec3 result;
  vec3 norm;
  if (uDeformType == 0) {
    result = wave(csm_Position, uWaveFrequency, uWaveAmplitude);
    mat3 jacobian = jacobianWave(csm_Position, result, e, uWaveFrequency, uWaveAmplitude);
    norm = calcNorm(jacobian, normal);
  } else if (uDeformType == 1) {
    result = churros(csm_Position);
    mat3 jacobian = jacobianChurros(csm_Position, result, e);
    norm = calcNorm(jacobian, normal);
  } else {
    result = helix(
      csm_Position,
      uHelixFrequency,
      uHelixAmplitude,
      uHelixRadius,
      uHelixPitch
    );
    mat3 jacobian = jacobianHelix(
      csm_Position,
      result,
      e,
      uHelixFrequency,
      uHelixAmplitude,
      uHelixRadius,
      uHelixPitch
    );
    norm = calcNorm(jacobian, normal);
  }
  vec3 rotatedPosition = rotateXYZ(result, uRotation);
  vec3 rotatedNormal = normalize(rotateXYZ(norm, uRotation));
  csm_Position = rotatedPosition;
  csm_Normal = rotatedNormal;

  vNormalW = normalize(mat3(modelMatrix) * rotatedNormal);
}
