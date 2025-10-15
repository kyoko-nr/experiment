uniform float uFrequency;
uniform float uWaveAmplitude;

varying vec3 vNormalW;

void main() {

  vNormalW = normalize(mat3(modelMatrix) * normal);

  // 波波にする
  float wavePhase = csm_Position.x * uFrequency;
  float waveOffset = sin(wavePhase) * uWaveAmplitude;
  csm_Position.y += waveOffset;
}
