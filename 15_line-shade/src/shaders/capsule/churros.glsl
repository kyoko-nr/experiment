// 大円半径。カプセルの長さに対して適宜調整
const float R = 1.5;

vec3 churros(vec3 pos) {
  float theta = pos.x * 0.5 / R * PI - (PI * 0.5);
  float c = cos(theta);
  float s = sin(theta);

  // トーラスのセンターラインに沿って曲げる
  // X,Yを円周上にマップし、断面のYを半径方向へ、Zはそのまま
  float nx = c * (R + pos.y);
  float ny = s * (R + pos.y);
  float nz = pos.z + (pos.x * 0.15);
  return vec3(nx, ny, nz);
}

mat3 jacobianChurros(vec3 pos, vec3 pb, float e) {
  vec3 dx = (churros(pos + vec3(e,0,0)) - pb) / e;
  vec3 dy = (churros(pos + vec3(0,e,0)) - pb) / e;
  vec3 dz = (churros(pos + vec3(0,0,e)) - pb) / e;
  return mat3(dx, dy, dz); // 各列が偏微分ベクトル
}
