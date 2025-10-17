vec3 wave(vec3 pos, float uFrequency, float uWaveAmplitude) {
  float wavePhase = pos.x * uFrequency;
  // float offsetY = sin(wavePhase + uElapsedTime) * uWaveAmplitude;
  float offsetY = sin(wavePhase) * uWaveAmplitude;
  return vec3(pos.x, pos.y + offsetY, pos.z);
}

mat3 jacobianWave(vec3 pos, vec3 pb, float e, float uFrequency, float uWaveAmplitude) {
  vec3 dx = (wave(pos + vec3(e,0,0), uFrequency, uWaveAmplitude) - pb) / e;
  vec3 dy = (wave(pos + vec3(0,e,0), uFrequency, uWaveAmplitude) - pb) / e;
  vec3 dz = (wave(pos + vec3(0,0,e), uFrequency, uWaveAmplitude) - pb) / e;
  return mat3(dx, dy, dz); // 各列が偏微分ベクトル
}
