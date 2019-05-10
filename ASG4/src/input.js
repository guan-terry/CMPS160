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
  constructor(canvas, scene, camera) {
    this.canvas = canvas;
    this.scene = scene;
    this.camera = camera;
    this.isMouseDown = false;

    _inputHandler = this;

    // Mouse Events
    this.canvas.onmousedown = function(ev) {
      _inputHandler.mouseDown(ev)
    };
    this.canvas.onmousemove = function(ev) {
      _inputHandler.mouseMove(ev)
    };
    this.canvas.onmouseup = function(ev) {
      _inputHandler.mouseUp(ev)
    };

    // Keyboard Events
    document.addEventListener('keydown', function(ev) {
      _inputHandler.keyDown(ev);
    }, false);
    /*document.addEventListener('keyup', function(ev) {
      _inputHandler.keyUp(ev);
    }, false);*/

    document.addEventListener('scroll', function(ev) {
      _inputHandler.scroll(ev);
    });

    // Button Events
    document.getElementById('fileLoad').onclick = function() {
      _inputHandler.readSelectedFile()
    };

    // HTML Slider Events
    document.getElementById('exampleSlider').addEventListener('mouseup', function() {
      console.log(this.value);
    });
  }

  /**
   * Changes the isMouseDown variable to false.
   */
  mouseUp(ev) {
    this.isMouseDown = false;
  }

  /**
   *  If the mouse is held down and the mouse is moving
   *  then change the tilt and pan depending on the
   *  mouse movement
   */
  mouseMove(ev) {
    if (this.isMouseDown && ev.movementX != 0) {
      this.camera.pan(ev.movementX);
    }
    if (this.isMouseDown && ev.movementY != 0) {
      this.camera.tilt(ev.movementY);
    }
  }
  /**
   *  changes the isMouseDown variable to true
   */
  mouseDown(ev) {
    this.isMouseDown = true;
  }

  scroll(ev) {
    this.camera.zoom();
  }

  /**
   *  If either wasd is held down, then the camera
   *  will be moved according to the key pressed.
   */
  keyDown(ev) {
    var keyName = event.key;
    //console.log("key down", keyName);

    if (keyName == "a") {
      this.camera.truck(-1);
    } else if (keyName == "d") {
      this.camera.truck(1);
    } else if (keyName == 'w') {
      this.camera.dolly(-1);
    } else if (keyName == 's') {
      this.camera.dolly(1);
    } else if (keyName == 'z') {
      this.camera.changePerspective();
    } else if (keyName == 'm') {
      this.camera.zoom();
    } else if (keyName == 'n') {
      this.camera.zoomOut();
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

  readTexture(src, onTexLoad) {
    // Create the image object
    var image = new Image();
    if (!image) {
      console.log('Failed to create the image object');
      return false;
    }

    // Register the event handler to be called on loading an image
    image.onload = function() {
      _inputHandler.image = image;
      onTexLoad(image);
    };

    // Tell the browser to load an image
    image.src = src
    return true;
  }
}
