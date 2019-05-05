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

  // Initialize the scene
  var scene = new Scene();
  var inputHandler = new InputHandler(canvas, scene);

  var clearCanvas = document.getElementById("Clear Canvas");
  clearCanvas.onclick = function() {
    scene.clearGeometries();
  }

  inputHandler.shapeObject = 1;
  var triangleButton = document.getElementById("Fluctuating Triangles");
  triangleButton.onclick = function() {
    inputHandler.shapeObject = 1;
  }
  var squareButton = document.getElementById("spinningSquare");
  squareButton.onclick = function() {
    inputHandler.shapeObject = 2;
  }
  var circleButton = document.getElementById("Randomly Moving Circles");
  circleButton.onclick = function() {
    inputHandler.shapeObject = 3;
  }
  var cubeButton = document.getElementById("Tilted Cube");
  cubeButton.onclick = function() {
    inputHandler.shapeObject = 4;
  }
  // Initialize shader
  shader = new Shader(gl, ASG1_VSHADER, ASG1_FSHADER);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");

  // Add uniforms
  var idMatrix = new Matrix4();
  shader.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, null);
  renderer.start();
}
