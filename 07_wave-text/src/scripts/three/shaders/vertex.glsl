uniform sampler2D uNoise;
uniform float uTime;

varying vec2 vUv;

void main() {
	vUv = uv;

	// vec3 newPos = position;
	// // wave
	// vec2 waveUv = uv * 0.3 - uTime * 0.01;
	// vec4 wave = texture2D(uNoise, waveUv);
	// newPos.z -= (wave.r + wave.g) * 0.1;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// varying vec2 vUv;

// 		void main() {

// 			vUv = uv;
// 			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

// 		}