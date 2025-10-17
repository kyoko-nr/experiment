vec3 calcNorm(mat3 jacobian, vec3 normal) {
	float sgn  = sign(determinant(jacobian));
  mat3 invJT = transpose(inverse(jacobian));
  return normalize(invJT * normalize(normal) * sgn);
}
