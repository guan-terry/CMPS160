var shader = null;
var shaderTexture = null;

function main() {
  // Retrieve the canvas and hud from the HTML document
  var canvas = document.getElementById("webgl");
  var hud = document.getElementById("hud");

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  var ctx = hud.getContext('2d');
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (!gl || !ctx) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }
  var camera = new Camera();
  var light = new Light(-1.3, -0.3, 0.5);



  // Initialize the scene
  var scene = new Scene();
  var inputHandler = new InputHandler(canvas, scene, hud);

  scene.setLight(light);


  // Initialize shader
  shader = new Shader(gl, ASG3_VSHADER, ASG3_FSHADER);
  shaderTexture = new Shader(gl, TEXTURE_VSHADER, TEXTURE_FSHADER);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_TexCoord");
  shader.addUniform("u_EyeVector", "vec3", new Vector3());
  shader.addUniform("u_SpecularColor", "vec3", new Vector3());
  shader.addUniform("u_DiffuseColor", "vec3", new Vector3());
  shader.addUniform("u_AmbientColor", "vec3", new Vector3());
  shader.addUniform("u_LightPosition", "vec3", new Vector3());
  shader.addUniform("u_Normal", "vec3", new Vector3());

  shaderTexture.addAttribute("a_Position");
  shaderTexture.addAttribute("a_Color");
  shaderTexture.addAttribute("a_TexCoord");
  shaderTexture.addUniform("u_EyeVector", "vec3", new Vector3());
  shaderTexture.addUniform("u_SpecularColor", "vec3", new Vector3());
  shaderTexture.addUniform("u_DiffuseColor", "vec3", new Vector3());
  shaderTexture.addUniform("u_AmbientColor", "vec3", new Vector3());
  shaderTexture.addUniform("u_LightPosition", "vec3", new Vector3());
  shaderTexture.addUniform("u_Normal", "vec3", new Vector3());

  // Add uniforms
  shader.addUniform("u_Sampler", "sampler2D", 0);
  var idMatrix = new Matrix4();
  shader.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);
  shaderTexture.addUniform("u_Sampler", "sampler2D", 0);
  shaderTexture.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);

  inputHandler.readTexture("img/bird.jpg", function(img) {
    scene.addGeometry(new square(shaderTexture, -0.5, -.5, 0, 1.0, 0.0, 1.0, 0.1, 0.5, img));
  })


  inputHandler.readTexture("img/ground.jpg", function(image) {
    scene.addGeometry(new square(shaderTexture, 0, -.8, 0, 0, 1, 0, 1.0, 1.0, image));
  })

  //console.log(user);
  //scene.addGeometry(new square(shader, 0, -.8, 0, 0, 1, 0, 1.0, 1.0, null));



  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera, ctx, shader);
  renderer.start();
}
