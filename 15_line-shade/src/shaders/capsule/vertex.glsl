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

const vec3 rotateWaveAngle = vec3(0.0, 0.0, -0.4);
const vec3 rotateChurrosAngle = vec3(-0.6, 0.0, 0.0);
const vec3 rotateHelixAngle = vec3(0.0, 0.7, 0.5);

#include "./wave.glsl"
#include "./churros.glsl"
#include "./helix.glsl"
#include "./rotateXYZ.glsl"
#include "./calcnorm.glsl"

void main() {
  vec3 result;
  vec3 norm;
  vec3 angle = uRotation;
  if (uDeformType == 0) {
    result = wave(csm_Position, uWaveFrequency, uWaveAmplitude);
    mat3 jacobian = jacobianWave(csm_Position, result, e, uWaveFrequency, uWaveAmplitude);
    norm = calcNorm(jacobian, normal);
    angle = rotateWaveAngle;
  } else if (uDeformType == 1) {
    result = churros(csm_Position);
    mat3 jacobian = jacobianChurros(csm_Position, result, e);
    norm = calcNorm(jacobian, normal);
    angle = rotateChurrosAngle;
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
    angle = rotateHelixAngle;
  }
  result = rotateXYZ(result, angle);
  norm = normalize(rotateXYZ(norm, angle));
  csm_Position = result;
  csm_Normal = norm;

  vNormalW = normalize(mat3(modelMatrix) * norm);
}
