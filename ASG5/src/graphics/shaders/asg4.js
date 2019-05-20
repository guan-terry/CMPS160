// Vertex Shader
var ASG4_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec2 a_TexCoord;
  attribute vec4 a_Normal;

  varying vec2 v_TexCoord;
  varying vec3 v_Normal;
  varying vec3 v_realPosition;


  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_NormalMatrix;



  void main() {
    v_realPosition = vec3(a_Position);
    v_TexCoord = a_TexCoord;
    v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * a_Position;
  }`;

// Fragment Shader
var ASG4_FSHADER =
  `precision mediump float;
  varying vec2 v_TexCoord;
  varying vec3 v_Normal;
  varying vec3 v_Position;
  varying vec3 v_realPosition;


  uniform vec3 u_DiffuseColor;
  uniform vec3 u_AmbientColor;
  uniform vec3 u_LightPosition;
  uniform vec3 u_SpecularColor;
  uniform mat4 u_ViewMatrix;
  uniform vec3 u_EyeVector;


  uniform sampler2D u_Sampler;

  void main() {
    vec3 eyeVector = vec3(u_EyeVector);
    vec3 normal = normalize(v_Normal);
    vec3 lightDirection = normalize(u_LightPosition - v_realPosition);
    float nDotL = max(dot(lightDirection, normal), 0.0);
    vec3 vectorRay = 2.0*nDotL*normal - lightDirection;
    float maxSquared = pow(max(dot(vectorRay, eyeVector), 0.0),4.0);
    vec4 texelColor = texture2D(u_Sampler, v_TexCoord);
    vec3 specular = u_SpecularColor * texelColor.rgb * maxSquared;
    vec3 diffuse = u_DiffuseColor * texelColor.rgb * nDotL;
    vec3 ambient = u_AmbientColor * texelColor.rgb;
    gl_FragColor = vec4(specular + diffuse + ambient, 1.0);
  }`;
