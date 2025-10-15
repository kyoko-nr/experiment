uniform float uFrequency;
uniform float uWaveAmplitude;

void main() {
  float wavePhase = csm_Position.x * uFrequency;
  float waveOffset = sin(wavePhase) * uWaveAmplitude;
  csm_Position.y += waveOffset;
}
