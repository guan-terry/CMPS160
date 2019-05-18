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
  var light = new Light(-2,0,-2);
  scene.setLight(light);

  var inputHandler = new InputHandler(canvas, scene);

  // Initialize shader
  shader = new Shader(gl, ASG1_VSHADER, ASG1_FSHADER);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_Normal");

  shader.addUniform("u_SpecularColor", "vec3", new Vector3());
  shader.addUniform("u_DiffuseColor", "vec3", new Vector3());
  shader.addUniform("u_AmbientColor", "vec3", new Vector3());
  shader.addUniform("u_LightPosition", "vec3", new Vector3());

  shader.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, null);
  renderer.start();
}
