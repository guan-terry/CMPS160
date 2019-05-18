// Vertex Shader
var ASG1_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  varying vec3 v_Position;
  attribute vec4 a_Normal;
  varying vec3 v_Normal;
  attribute vec4 a_Color;
  varying vec4 v_Color;

  uniform mat4 u_ModelMatrix;
  uniform mat4 u_NormalMatrix;


  void main() {
    v_Color = a_Color;
    v_Position = vec3(u_ModelMatrix * a_Position);
    v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
    gl_Position = u_ModelMatrix * a_Position;
  }`;

// Fragment Shader
//vec3 eyeMatrix = new Vector3(viewMatrix.elements[0], viewMatrix.elements[1], viewMatrix.elements[3]);
//    vec3 specular = u_SpecularColor * v_Color.rgb * maxSquared;
//    float maxSquared = max(dot(vectorRay, eyeMatrix), 0);



var ASG1_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;
  varying vec3 v_Normal;
  varying vec3 v_Position;

  uniform vec3 u_DiffuseColor;
  uniform vec3 u_AmbientColor;
  uniform vec3 u_LightPosition;
  uniform vec3 u_SpecularColor;

  void main() {
    vec3 eyeVector = vec3(1.0, 0.0, -5.0);
    vec3 normal = normalize(v_Normal);
    vec3 lightDirection = normalize(u_LightPosition - v_Position);
    float nDotL = max(dot(lightDirection, normal), 0.0);
    vec3 vectorRay = 2.0*nDotL*normal - lightDirection;
    float maxSquared = pow(max(dot(vectorRay, eyeVector), 0.0),2.0);
    vec3 specular = u_SpecularColor * v_Color.rgb * maxSquared;
    vec3 diffuse = u_DiffuseColor * v_Color.rgb * nDotL;
    vec3 ambient = u_AmbientColor * v_Color.rgb;
    gl_FragColor = vec4(normal, 1.0);
  }`;
