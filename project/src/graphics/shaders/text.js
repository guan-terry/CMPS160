// Vertex Shader
var TEXTURE_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec2 a_TexCoord;
  uniform mat4 u_ModelMatrix;
  varying vec2 v_TexCoord;
  varying vec4 v_Color;

  void main() {
    v_Color = a_Color;
    v_TexCoord = a_TexCoord;
    gl_Position = u_ModelMatrix * a_Position;
  }`;

// Fragment Shader
var TEXTURE_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;
  varying vec2 v_TexCoord;

  uniform sampler2D u_Sampler;

  void main() {
    vec4 tex = texture2D(u_Sampler,v_TexCoord);
    gl_FragColor = tex * v_Color;
  }`;