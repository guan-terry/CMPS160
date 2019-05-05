var shader = null;
var shaderOld = null;

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

  //switches between click and other
  var switchButtons = document.getElementById("switchRainbow");
  switchButtons.onclick = function() {
    if (switchButtons.value == "Solid Colors") {
      switchButtons.value = "Rainbow";
      inputHandler.isRainbow = true;
    } else {
      switchButtons.value = "Solid Colors";
      inputHandler.isRainbow = false;
    }
  }
  // Initialize shader
  shader = new Shader(gl, ASG1_VSHADER, ASG1_FSHADER);
  shaderOld = new Shader(gl, OLD_VSHADER, OLD_FSHADER);
  var idMatrix = new Matrix4();
  shaderOld.addAttribute("a_Position");
  shaderOld.addAttribute("a_Color");
  shaderOld.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_TexCoord");


  // Add uniforms
  var image = document.getElementById("fileStart");
  shader.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);
  scene.addGeometry(new startTiltedCubes(shader, 250, 250, 0, 0, 0, 2.5, image));
  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, null);
  renderer.start();
}
