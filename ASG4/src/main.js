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
  var camera = new Camera();

  var inputHandler = new InputHandler(canvas, scene, camera);

  // Initialize shader
  shader = new Shader(gl, ASG4_VSHADER, ASG4_FSHADER);
  shaderNoTexture = new Shader(gl, OLD_VSHADER, OLD_FSHADER);

  // Add attibutes for texture shader
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_TexCoord");

  // Add attributes for no texture shader
  shaderNoTexture.addAttribute("a_Position");
  shaderNoTexture.addAttribute("a_Color");

  // Add uniforms for texture shader
  shader.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);
  shader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);

  // Add uniforms for no texture shaders
  shaderNoTexture.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shaderNoTexture.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elemetns);
  // Load texture and add triangle to the scene with that texture.
  /*inputHandler.readTexture("objs/cat_.jpg", function(image) {
      var shape = new Triangle(shader, image);
      scene.addGeometry(shape);
  })*/

  //adds the floor of the scene
  var floor = new spinningSquare(shaderNoTexture, 0, 0, 0, 255, 0, 0);
  scene.addGeometry(floor);

  for(int i = 0; i < 32; i++) {
    
  }
  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();
}
