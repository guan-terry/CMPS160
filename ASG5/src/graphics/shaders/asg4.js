// Vertex Shader
var ASG4_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec2 a_TexCoord;
  attribute vec4 a_Normal;

  varying vec4 v_Color;
  varying vec2 v_TexCoord;
  varying vec3 v_Normal;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;

  void main() {
    v_Color = a_Color;
    v_TexCoord = a_TexCoord;
    v_Normal = vec3(a_Normal);
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * a_Position;
  }`;

// Fragment Shader
var ASG4_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;
  varying vec2 v_TexCoord;


  uniform vec3 u_DiffuseColor;
  uniform vec3 u_AmbientColor;
  uniform vec3 u_LightPosition;
  uniform vec3 u_SpecularColor;
  uniform vec3 u_EyeVector;


  uniform sampler2D u_Sampler;

  void main() {
    gl_FragColor = texture2D(u_Sampler, v_TexCoord);
  }`;
