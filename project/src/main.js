var shader = null;

function main() {
  // Retrieve the canvas and hud from the HTML document
  var canvas = document.getElementById("webgl");
  var hud    = document.getElementById("hud");

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  var ctx = hud.getContext('2d');
  if (!gl || !ctx) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  // Initialize the scene
  var scene = new Scene();
  var inputHandler = new InputHandler(canvas, scene, hud);

  // Initialize shader
  shader = new Shader(gl, ASG3_VSHADER, ASG3_FSHADER);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_TexCoord");

  // Add uniforms
  shader.addUniform("u_Sampler", "sampler2D", 0);
  var idMatrix = new Matrix4();
  shader.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);

                                    // x    y  z  r  g  b  xSize ySize image
  scene.addGeometry(new square(shader, 0, -.8, 0, 0, 1, 0, 1.0, 1.0, null));
                                      // x    y   z  r     g   b   xSize ySize image
  scene.addGeometry(new square(shader, -0.5, -.5, 0, 1.0, 0.0, 1.0, 0.1, 0.5, null));


  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, null, ctx);
  renderer.start();
}
