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
    constructor(canvas, scene) {
      this.canvas = canvas;
      this.scene = scene;

      _inputHandler = this;

      this.image = null;

      // Mouse Events
      this.canvas.onmousedown = function(ev) { _inputHandler.click(ev) };
      this.canvas.onmousemove = function(ev) { };

      //Keyboard Events
      document.addEventListener('keydown', function(ev) {
        _inputHandler.keyDown(ev);
      }, false);

      // Button Events
      document.getElementById('fileLoad').onclick = function() { _inputHandler.readSelectedFile() };

      document.getElementById('texInput').onchange = function() { _inputHandler.readTexture() };

      // HTML Slider Events
      document.getElementById('exampleSlider').addEventListener('mouseup', function() { console.log(this.value); });
    }

    /**
     * Function called upon mouse click.
     */
    click(ev) {
        // Print x,y coordinates.
        console.log(ev.clientX, ev.clientY);

    }

    keyDown(ev) {
      var keyName = event.key;
      if (keyName == ' ') {
        console.log(this.scene.geometries[1]);
        this.scene.geometries[1].test();
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
