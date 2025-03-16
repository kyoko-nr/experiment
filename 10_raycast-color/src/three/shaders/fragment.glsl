uniform sampler2D tDiffuse;
uniform sampler2D uTexture;
uniform sampler2D uNoise;
uniform float uTime;

varying vec2 vUv;

void main() {
  vec2 newUv = vUv;
  float sinval = (1.0 + sin(uTime)) * 0.5 + 0.25;
  newUv = vec2((newUv.x + (cos(uTime * 0.1)) * 0.2), (newUv.y + (1.0 - sin( uTime * 0.15))) * 0.2);
  float noise = texture2D(uNoise, newUv).r;
  noise = pow(noise, 2.0);
  noise *= sinval;
  float colorIntensity = texture2D(uTexture, vUv).r;

  vec3 result = vec3(0.0);

  // noise color
  vec3 color = texture2D(tDiffuse, vUv).rgb;
  vec3 bw = vec3(color.r);
  result = mix(bw, color, noise);

  // pointer color
  result = mix(result, color, colorIntensity);
  // result = vec3(noise);

  gl_FragColor = vec4(result, 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}