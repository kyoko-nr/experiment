uniform sampler2D tDiffuse;
uniform sampler2D uTexture;

varying vec2 vUv;

void main() {

  float colorIntensity = texture2D(uTexture, vUv).r;

  // vec3 color = vec3(0.0, 0.0, 0.0);
  vec3 color = texture2D(tDiffuse, vUv).rgb;
  vec3 bw = vec3(color.r);

  vec3 texel = mix(bw, color, colorIntensity);

  vec3 result = texel;

  gl_FragColor = vec4(result, 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}