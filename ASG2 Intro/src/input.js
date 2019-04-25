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

    _inputHandler = this;

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
      _inputHandler.readSelectedFile()
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
      var shape = new Triangle(shader, ev.clientX, ev.clientY, r, g, b, shapeMultiplier);
    } else if (this.shapeObject == 2) {
      var shape = new spinningSquare(shader, ev.clientX, ev.clientY, r, g, b, shapeMultiplier);
    } else {
      var shape = new movingCircles(shader, ev.clientX, ev.clientY, circlePointNumber, r, g, b, shapeMultiplier);
    }

    this.scene.addGeometry(shape);
    //var shape = new Triangle(shader);
    //this.scene.addGeometry(shape);
  }

  /**
   * Function called to read a selected file.
   */
  readSelectedFile() {
    var fileReader = new FileReader();
    var objFile = document.getElementById("fileInput").files[0];

    if (!objFile) {
      alert("OBJ file not set!");
      return;
    }

    fileReader.readAsText(objFile);
    fileReader.onloadend = function() {
      // alert(fileReader.result);
      var customObj = new CustomOBJ(shader, fileReader.result);
      _inputHandler.scene.addGeometry(customObj);
    }
  }
}
