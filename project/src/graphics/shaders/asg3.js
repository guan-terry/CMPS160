// Vertex Shader
var ASG3_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec2 a_TexCoord;
  uniform mat4 u_ModelMatrix;
  varying vec2 v_TexCoord;
  varying vec4 v_Color;
  varying vec3 v_realPosition;



  void main() {
    v_Color = a_Color;
    v_realPosition = vec3(u_ModelMatrix * a_Position);
    v_TexCoord = a_TexCoord;
    gl_Position = u_ModelMatrix * a_Position;
  }`;

// Fragment Shader
var ASG3_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;
  varying vec2 v_TexCoord;
  varying vec3 v_realPosition;


  uniform sampler2D u_Sampler;
  uniform vec3 u_EyeVector;
  uniform vec3 u_Normal;

  uniform vec3 u_DiffuseColor;
  uniform vec3 u_AmbientColor;
  uniform vec3 u_LightPosition;
  uniform vec3 u_SpecularColor;


  void main() {
    vec3 eyeVector = vec3(u_EyeVector);
    vec3 lightDirection = normalize(u_LightPosition - v_realPosition);
    float nDotL = max(dot(lightDirection, u_Normal), 0.0);
    vec3 vectorRay = 2.0*nDotL*u_Normal - lightDirection;
    float maxSquared = pow(max(dot(vectorRay, eyeVector), 0.0),4.0);
    vec3 specular = u_SpecularColor * v_Color.rgb * maxSquared;
    vec3 diffuse = u_DiffuseColor * v_Color.rgb * nDotL;
    vec3 ambient = u_AmbientColor * v_Color.rgb;


    gl_FragColor = vec4(specular + ambient + diffuse, 1.0);
  }`;
