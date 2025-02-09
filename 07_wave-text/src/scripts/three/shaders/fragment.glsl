// uniform sampler2D uDiffuse;

// varying vec2 vUv;

// void main() {
// 	vec4 texel = texture2D(uDiffuse, vUv);
// 	gl_FragColor = vec4(0.5, 1.0, 1.0, 1.0);
// }

uniform float opacity;

uniform sampler2D tDiffuse;

varying vec2 vUv;

void main() {
	vec4 texel = texture2D( tDiffuse, vUv );
	gl_FragColor = opacity * texel;
	// gl_FragColor = vec4(0.5, 1.0, 1.0, 1.0);
}