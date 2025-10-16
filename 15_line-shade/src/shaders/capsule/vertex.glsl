uniform int uDeformType; // 0: wave, 1: churros
uniform float uFrequency;
uniform float uWaveAmplitude;
uniform float uElapsedTime;

varying vec3 vNormalW;
varying vec3 vWorldPos;

const float e = 0.0005;

vec3 snake(vec3 pos) {
  float wavePhase = pos.x * uFrequency;
  float offsetY = sin(wavePhase + uElapsedTime) * uWaveAmplitude;
  // float offsetY = sin(wavePhase) * uWaveAmplitude;
  return vec3(pos.x, pos.y + offsetY, pos.z);
}

vec3 normSnake(vec3 pos, vec3 pb) {
  vec3 dx = (snake(pos + vec3(e,0,0)) - pb) / e;
  vec3 dy = (snake(pos + vec3(0,e,0)) - pb) / e;
  vec3 dz = (snake(pos + vec3(0,0,e)) - pb) / e;
  mat3 jacobian = mat3(dx, dy, dz); // 各列が偏微分ベクトル
  mat3 invJT = transpose(inverse(jacobian));
  return normalize(invJT * normalize(normal));
}

vec3 churros(vec3 pos) {
  // 大円半径。カプセルの長さに対して適宜調整
  float R = 1.5;
  float theta = pos.x * 0.5 / R * 3.14;
  float c = cos(theta);
  float s = sin(theta);

  // トーラスのセンターラインに沿って曲げる
  // X,Yを円周上にマップし、断面のYを半径方向へ、Zはそのまま
  float nx = c * (R + pos.y);
  float ny = s * (R + pos.y);
  float nz = pos.z + (pos.x * 0.15);
  return vec3(nx, ny, nz);
}

vec3 normChurros(vec3 pos, vec3 pb) {
  vec3 dx = (churros(pos + vec3(e,0,0)) - pb) / e;
  vec3 dy = (churros(pos + vec3(0,e,0)) - pb) / e;
  vec3 dz = (churros(pos + vec3(0,0,e)) - pb) / e;
  mat3 jacobian = mat3(dx, dy, dz); // 各列が偏微分ベクトル
  mat3 invJT = transpose(inverse(jacobian));
  return normalize(invJT * normalize(normal));
}

void main() {
  vec3 result;
  vec3 norm;
  if (uDeformType == 0) {
    result = snake(csm_Position);
    norm = normSnake(csm_Position, result);
  } else {
    result = churros(csm_Position);
    norm = normChurros(csm_Position, result);
  }
  csm_Position = result;
  csm_Normal = norm;

  vNormalW = normalize(mat3(modelMatrix) * norm);
}
