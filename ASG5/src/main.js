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
  var light = new Light(16,32,0);
  scene.setLight(light);
  var camera = new Camera();

  var walls = [[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],//1
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],//2
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],//3
               [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],//4
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],//6
               [3,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,4],//8
               [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],//10
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//12
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],//14
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,3],
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],//16
               [4,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],//18
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//20
               [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [2,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],//22
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
               [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,4],//24
               [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
               [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//26
               [4,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//28
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
               [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],//30
               [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
               [4,4,3,2,1,4,1,2,3,1,4,2,1,4,2,2,3,3,1,4,3,1,4,2,3,1,4,3,2,4,2,1],//32
             ];

  var inputHandler = new InputHandler(canvas, scene, camera);

  // Initialize shader
  shader = new Shader(gl, ASG4_VSHADER, ASG4_FSHADER);
  shaderNoTexture = new Shader(gl, OLD_VSHADER, OLD_FSHADER);

  // Add attibutes for texture shader
  shader.addAttribute("a_Position");
  shader.addAttribute("a_TexCoord");
  shader.addAttribute("a_Normal");



  // Add uniforms for texture shader
  shader.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);
  shader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);


  shader.addUniform("u_EyeVector", "vec3", new Vector3());
  shader.addUniform("u_SpecularColor", "vec3", new Vector3());
  shader.addUniform("u_DiffuseColor", "vec3", new Vector3());
  shader.addUniform("u_AmbientColor", "vec3", new Vector3());
  shader.addUniform("u_LightPosition", "vec3", new Vector3());


  // Add attributes for no texture shader
  shaderNoTexture.addAttribute("a_Position");
  shaderNoTexture.addAttribute("a_Color");
  shaderNoTexture.addAttribute("a_Normal");

  // Add uniforms for no texture shaders
  shaderNoTexture.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shaderNoTexture.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elemetns);
  shaderNoTexture.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);

  shaderNoTexture.addUniform("u_EyeVector", "vec3", new Vector3());
  shaderNoTexture.addUniform("u_SpecularColor", "vec3", new Vector3());
  shaderNoTexture.addUniform("u_DiffuseColor", "vec3", new Vector3());
  shaderNoTexture.addUniform("u_AmbientColor", "vec3", new Vector3());
  shaderNoTexture.addUniform("u_LightPosition", "vec3", new Vector3());

  // Load texture and add triangle to the scene with that texture.
  /*inputHandler.readTexture("objs/cat_.jpg", function(image) {
      var shape = new Triangle(shader, image);
      scene.addGeometry(shape);
  })*/

  //adds the floor of the scene
  var floor = new spinningSquare(shaderNoTexture, 0, 0, 0, 0, 255, 0);
  scene.addGeometry(floor);

  inputHandler.readTexture("objs/wall256.png", function(image) {
    for(var row = 0; row < 32; row++) {
      for (var col = 0; col < 32; col++) {
        if (walls[row][col] > 0) {
          var wallDraw = new tiltedCubes(shader, row-16, walls[row][col], col-16, 0, 0, 0, 1, image, true )
          scene.addGeometry(wallDraw);
        }
      }
    }
  })



  var sphere1 = new Sphere(shaderNoTexture, 5, .7, 0, 30, 122, 120, 0);
  scene.addGeometry(sphere1);
  var sphere2 = new Sphere(shaderNoTexture, 15, 2, 15, 30, 122, 120, 0);
  scene.addGeometry(sphere2);
  var sphere3 = new Sphere(shaderNoTexture, 15, 2, 0, 30, 122, 120, 0);
  scene.addGeometry(sphere3);
  /*
  inputHandler.readTexture("objs/wall256.png", function(image) {
    var wallDraw = new tiltedCubes(shader, -2, 4, 0, 0, 0, 0, 1, image, true);
    scene.addGeometry(wallDraw);
    var wallDraw1 = new tiltedCubes(shader, -1, 4, 0, 0, 0, 0, 1, image, true);
    scene.addGeometry(wallDraw1);
    var wallDraw2 = new tiltedCubes(shader, -3, 4, 0, 0, 0, 0, 1, image, true);
    scene.addGeometry(wallDraw2);
    var wallDraw3 = new tiltedCubes(shader, -4, 4, 0, 0, 0, 0, 1, image, true);
    scene.addGeometry(wallDraw3);
  })
*/
  inputHandler.readTexture("objs/sky.jpg", function(image) {
    var skyBox = new tiltedCubes(shader, -16, 14, -16, 0, 0, 0 , 32, image, false );
    scene.addGeometry(skyBox);
  })
  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();
}
