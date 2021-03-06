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
    this.object = null;

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

    // HTML slider events for objects
    document.getElementById('redSlider').addEventListener('mouseup', function() {
      _inputHandler.changeRedColor(this.value / 255);
    });
    document.getElementById('greenSlider').addEventListener('mouseup', function() {
      _inputHandler.changeGreenColor(this.value / 255);
    })
    document.getElementById('blueSlider').addEventListener('mouseup', function() {
      _inputHandler.changeBlueColor(this.value / 255);
    })

    // HTML slider events for the moving blocks
    document.getElementById('redWalls').addEventListener('mouseup', function() {
      _inputHandler.changeRedWall(this.value / 255);
    });
    document.getElementById('greenWalls').addEventListener('mouseup', function() {
      _inputHandler.changeGreenWall(this.value / 255);
    })
    document.getElementById('blueWalls').addEventListener('mouseup', function() {
      _inputHandler.changeBlueWall(this.value / 255);
    })
  }

  /**
   *  Changes the color of the wall when the blue Slider
   *  is changed
   */
  changeBlueWall(blueSliderVal) {
    if (this.scene.geometries[2] != null) {
      for (var i = 0; i < this.scene.geometries[2].data.length; i += 9) {
        this.scene.geometries[2].data[i + 5] = blueSliderVal;
      }
    }
    this.scene.blueVal = blueSliderVal;
  }

  /**
   *  Changes the color of the wall when the blue Slider
   *  is changed
   */
  changeRedWall(redSliderVal) {
    if (this.scene.geometries[2] != null) {
      for (var i = 0; i < this.scene.geometries[2].data.length; i += 9) {
        this.scene.geometries[2].data[i + 3] = redSliderVal;
      }
    }
    this.scene.redVal = redSliderVal;
  }

  /**
   *  Changes the color of the wall when the blue Slider
   *  is changed
   */
  changeGreenWall(greenSliderVal) {
    if (this.scene.geometries[2] != null) {
      for (var i = 0; i < this.scene.geometries[2].data.length; i += 9) {
        this.scene.geometries[2].data[i + 4] = greenSliderVal;
      }
    }
    this.scene.greenVal = greenSliderVal;
  }

  /**
   *  Changes the color of the specificed object when the red slider
   *  is changed
   *
   */
  changeRedColor(blueSliderVal) {
    if (this.object != null) {
      for (var i = 0; i < this.object.data.length; i += 9) {
        this.object.data[i + 3] = blueSliderVal;
      }
    }
  }

  /**
   *  Changes the color of the specified object when the green slider
   *  is changed
   */
  changeGreenColor(greenSliderVal) {
    if (this.object != null) {
      for (var i = 0; i < this.object.data.length; i += 9) {
        this.object.data[i + 4] = greenSliderVal;
      }
    }
  }

  /**
   *  Changes the color of the specefied object when the blue Slider
   *  is changed
   */
  changeBlueColor(blueSliderVal) {
    if (this.object != null) {
      for (var i = 0; i < this.object.data.length; i += 9) {
        this.object.data[i + 5] = blueSliderVal;
      }
    }
  }

  /**
   * Function called upon mouse click.
   */
  click(ev) {
    // Print x,y coordinates.
    var rect = canvas.getBoundingClientRect();
    var xClick = ev.clientX - rect.left;
    var yClick = ev.clientY - rect.top;
    console.log(xClick, yClick);
    if (yClick > 480) {
      this.object = this.scene.geometries[1];
    } else if (yClick < 480 && yClick > 420 && xClick > 160 && xClick < 227) {
      this.object = this.scene.geometries[0];
    }

  }

  keyup(ev) {
    if (this.scene.geometries[0].modelMatrix.elements[13] <= 0.01) {
      this.scene.geometries[0].test(this.jumpHold);
      this.jumpHold = 0;
    } else {
      this.scene.geometries[1].flashGround();
    }
  }

  keyDown(ev) {
    var keyName = event.key;
    if (keyName == 'l' || keyName == ' ' && this.scene.geometries[1].modelMatrix.elements[13] <= 0.01) {
      this.jumpHold += 14;
      if (this.jumpHold >= 42) {
        this.jumpHold = 42;
        this.scene.geometries[1].flashGround();
      }
    } else if (keyName != 'm') {
      //this.scene.geometries[0].flashGround();
      console.log(this.scene.geometries[1]);
    }
    if (keyName == 'm' && this.scene.panic == 1) {
      this.scene.panic -= 1;
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

  readTexture(src, onTexLoad) {
    // Create the image object
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
     image.src = src;
     return true;

  }
}
