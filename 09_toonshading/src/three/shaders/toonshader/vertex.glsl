uniform bool uIsEdge;
uniform float uEdgeWidth;

varying vec3 vNormal;
varying vec3 vColor;

void main()
{
  vec3 newPosition = position;
  if(uIsEdge) {
    newPosition += normal * uEdgeWidth;
  }
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

  vNormal = normal;
  vColor = color;
}