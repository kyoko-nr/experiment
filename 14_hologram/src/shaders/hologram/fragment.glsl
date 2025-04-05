uniform float uTime;
uniform float uIndex;
uniform float uProgress;
uniform vec3 uColor;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  float lines = 20.0;
  float offset = vPosition.y - uTime * 0.2;
  float density = mod(offset * lines, 1.0);
  density = pow(density, 3.0);

  vec3 viewDirection = normalize(vPosition - cameraPosition);
  float fresnel = 1.0 - abs(dot(normalize(vNormal), viewDirection));
  fresnel = pow(fresnel, 2.0);

  float falloff = smoothstep(0.8, 0.0, fresnel);

  float holographic = density * fresnel;
  holographic += fresnel * 1.25;
  holographic *= falloff;

  float posY = smoothstep(-1.5, 2.5, vPosition.y);
  if(uIndex == 0.0 && posY < uProgress) {
    discard;
  }
  if(uIndex == 1.0 && posY > uProgress) {
    discard;
  }

  vec3 color = uColor;
  gl_FragColor = vec4(color, holographic);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}