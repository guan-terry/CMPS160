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
  constructor(canvas, scene, hud) {
    this.hud = hud;
    this.canvas = canvas;
    this.scene = scene;

    _inputHandler = this;

    this.image = null;
    this.jumpHold = 0;

    // Mouse Events
    this.canvas.onmousedown = function(ev) {
      //_inputHandler.click(ev)
    };

    //Keyboard Events
    document.addEventListener('keydown', function(ev) {
      _inputHandler.keyDown(ev);
    }, false);

    document.addEventListener("keyup", function(ev) {
      _inputHandler.keyup(ev);
    }, false);



    this.hud.onmousedown = function(ev) {
      _inputHandler.click(ev);
    }

    // HTML Slider Events
    document.getElementById('exampleSlider').addEventListener('mouseup', function() {
      console.log(this.value);
    });
  }

  /**
   * Function called upon mouse click.
   */
  click(ev) {
    // Print x,y coordinates.
    console.log(ev.clientX, ev.clientY);

  }

  keyup(ev) {
    if (this.scene.geometries[1].modelMatrix.elements[13] <= 0.01) {
      this.scene.geometries[1].test(this.jumpHold);
      this.jumpHold = 0;
    } else {
      this.scene.geometries[0].flashGround();
    }
  }

  keyDown(ev) {
    var keyName = event.key;
    if (keyName == ' ' && this.scene.geometries[1].modelMatrix.elements[13] <= 0.01) {
      this.jumpHold += 14;
      if (this.jumpHold >= 42) {
        this.jumpHold = 42;
        this.scene.geometries[0].flashGround();
      }
    } else if (keyName != 'm') {
      this.scene.geometries[0].flashGround();
      console.log(this.scene.geometries[1]);
    }
    if (keyName == 'm') {
      var arrayHolder = [this.scene.geometries[0], this.scene.geometries[1]];
      this.scene.clearGeometries();
      this.scene.geometries = arrayHolder;
    }
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
      alert(fileReader.result);
    }
  }

  readTexture() {
    // Create the image object
    var image = new Image();
    if (!image) {
      console.log('Failed to create the image object');
      return false;
    }

    // Register the event handler to be called on loading an image
    image.onload = function() {
      _inputHandler.image = image;
    };

    var imgPath = document.getElementById("texInput").value;
    var imgPathSplit = imgPath.split("\\");

    // Tell the browser to load an image
    image.src = 'objs/' + imgPathSplit[imgPathSplit.length - 1];
    return true;
  }
}
