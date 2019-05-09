// Vertex Shader
var OLD_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  varying vec4 v_Color;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;

  void main() {
    v_Color = a_Color;
    gl_Position = u_ProjectionMatrix * u_ViewMatrix* a_Position;
  }`;

// Fragment Shader
var OLD_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;

  void main() {
    gl_FragColor = v_Color;
  }`;
