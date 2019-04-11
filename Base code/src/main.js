
var shader = null;

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }
  var shape = 1;
  // Initialize the scene
  var scene = new Scene();
  var inputHandler = new InputHandler(canvas, scene, shape);

  var clearCanvas = document.getElementById("clearCanvas");
  clearCanvas.onclick = function() {
    scene.clearGeometries();
  }

  var triangleButton = document.getElementById("triangleButton");
  triangleButton.onclick = function() {

  }
  // Initialize shader
  shader = new Shader(gl, ASG1_VSHADER, ASG1_FSHADER);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, null);
  renderer.start();
}
