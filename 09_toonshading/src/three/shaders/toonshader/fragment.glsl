uniform sampler2D uTexture;

varying vec3 vNormal;
varying vec3 vColor;

void main() {
  vec3 tex = texture2D(uTexture, vec2(vNormal.x + vNormal.y, 0.5)).rgb;
  gl_FragColor = vec4(tex, 1.0);
}