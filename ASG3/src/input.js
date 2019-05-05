var _inputHandler = null;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
class InputHandler {
  /**
   * Initializes the event handeling functions within the program.
   */
  constructor(canvas, scene, shapeObject) {
    this.canvas = canvas;
    this.scene = scene;
    this.isMouseDown = false;
    this.shapeObject = shapeObject;
    this.image = null;
    //true = rainbow, false = solidColors
    this.isRainbow = false;

    _inputHandler = this;

    //Texture
    document.getElementById("textureType").onchange = function() {
      _inputHandler.readTexture()
    };
    //console.log(this.image != null);
    // Mouse Events
    this.canvas.onmousedown = function(ev) {
      _inputHandler.click(ev);
      this.isMouseDown = true;
    };
    this.canvas.onmousemove = function(ev) {
      if (this.isMouseDown) {
        _inputHandler.click(ev);
      }
    };
    this.canvas.onmouseup = function(ev) {
      this.isMouseDown = false;
    }

    // Button Events
    document.getElementById('fileLoad').onclick = function() {
      console.log(_inputHandler.image != null);
      _inputHandler.readSelectedFile();
    };

    // HTML Slider Events
    //document.getElementById('exampleSlider').addEventListener('mouseup', function() { console.log(this.value); });
  }

  /**
   * Function called upon mouse click.
   */
  click(ev) {
    // Print x,y coordinates.
    //console.log(ev.clientX, ev.clientY);
    var sliderRed = document.getElementById("rangeRed");
    var sliderGreen = document.getElementById("rangeGreen");
    var sliderBlue = document.getElementById("rangeBlue");
    var r = sliderRed.value;
    var g = sliderGreen.value;
    var b = sliderBlue.value;
    var segCount = document.getElementById("segCount");
    var circlePointNumber = segCount.value;
    var shapeSize = document.getElementById("shapeSlider");
    var shapeMultiplier = shapeSize.value;


    if (this.shapeObject == 1) {
      var shape = new Triangle(shaderOld, ev.clientX, ev.clientY, r, g, b, shapeMultiplier, _inputHandler.isRainbow);
    } else if (this.shapeObject == 2) {
      var shape = new spinningSquare(shaderOld, ev.clientX, ev.clientY, r, g, b, shapeMultiplier, _inputHandler.isRainbow);
    } else if (this.shapeObject == 3) {
      var shape = new movingCircles(shaderOld, ev.clientX, ev.clientY, circlePointNumber, r, g, b, shapeMultiplier, _inputHandler.isRainbow);
    } else {
      if (_inputHandler.image != null) {
        console.log("tilted cubes ran with image");
        var shape = new tiltedCubes(shader, ev.clientX, ev.clientY, r, g, b, shapeMultiplier, _inputHandler.image);
      } else {
        var shape = new tiltedCubes(shaderOld, ev.clientX, ev.clientY, r, g, b, shapeMultiplier, null)
      }
    }

    this.scene.addGeometry(shape);
    //var shape = new Triangle(shader);
    //this.scene.addGeometry(shape);
  }

  /**
   * Function called to read a selected file.
   */
  readSelectedFile() {
    //console.log(this.image != null);

    var fileReader = new FileReader();
    var objFile = document.getElementById("fileInput").files[0];

    if (!objFile) {
      alert("OBJ file not set!");
      return;
    }
    var sliderRed = document.getElementById("rangeRed");
    var sliderGreen = document.getElementById("rangeGreen");
    var sliderBlue = document.getElementById("rangeBlue");
    var r = sliderRed.value;
    var g = sliderGreen.value;
    var b = sliderBlue.value;
    fileReader.readAsText(objFile);
    fileReader.onloadend = function() {
      //console.log(this.image != null);
      var customObj = new CustomOBJ(shader, fileReader.result, _inputHandler.image, r, g, b);
      _inputHandler.scene.addGeometry(customObj);
    }
  }

  readTexture() {
    var image = new Image();
    if (!image) {
      console.log("Failed to create an image object");
      return false;
    }

    image.onload = function() {
      _inputHandler.image = image;
      //console.log(_inputHandler.image != null);
    }
    var imgPath = document.getElementById("textureType").value;
    var imgPathSplit = imgPath.split("\\");

    // Tell the browser to load an image
    image.src = 'objs/' + imgPathSplit[imgPathSplit.length - 1];
    //this.image = image.src;
    //console.log(_inputHandler.image != null);
    return true;
  }
}
