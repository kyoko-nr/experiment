uniform bool uIsEdge;
uniform float uEdgeWidth;

varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
  vec3 newPosition = position;
  if(uIsEdge) {
    newPosition += normal * uEdgeWidth;
  }

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

  vNormal = normal;
  vPosition = modelPosition.xyz;
}