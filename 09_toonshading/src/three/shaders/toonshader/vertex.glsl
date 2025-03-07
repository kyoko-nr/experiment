uniform bool uIsEdge;

void main()
{
    vec3 newPosition = position;
    if(uIsEdge) {
      newPosition += normal * 0.01;
    }
    // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}