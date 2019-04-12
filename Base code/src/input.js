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
      this.shapeObject = shapeObject;
      this.isMouseDown = false;

      _inputHandler = this;

      // Mouse Events
      //this.canvas.onmousedown = function(ev) { _inputHandler.click(ev) };
      this.canvas.onmousedown = function(ev) { _inputHandler.mouseDown(ev)};
      this.canvas.onmouseup = function(ev) { _inputHandler.mouseUp(ev)};
    }

    mouseUp(ev) {
      console.log("MouseUP ran");
      this.isMouseDown = false;
    }

    mouseDown(ev) {
      this.isMouseDown = true;
      //this.canvas.onmouseup = function(ev) { this.mouseUp(ev)};
      if(this.isMouseDown) {
        setTimeout(this.mouseDown(ev), 1000);
        this.drag(ev);
      }
    }

    drag(ev) {
        var sliderRed = document.getElementById("rangeRed");
        var sliderGreen = document.getElementById("rangeGreen");
        var sliderBlue = document.getElementById("rangeBlue");
        var r = sliderRed.value;
        var g = sliderGreen.value;
        var b = sliderBlue.value;
        var segCount = document.getElementById("segCount");
        var circlePointNumber = segCount.value;
        
        if (this.shapeObject == 1) {
          var shape = new Triangle(shader, ev.clientX, ev.clientY, r, g, b);
        } else if(this.shapeObject == 2) {
          var shape = new Square(shader, ev.clientX, ev.clientY, r, g, b);
        } else {
          var shape = new Circle(shader, ev.clientX, ev.clientY, circlePointNumber, r, g, b);
        }

        this.scene.addGeometry(shape);      
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
        
        if (this.shapeObject == 1) {
          var shape = new Triangle(shader, ev.clientX, ev.clientY, r, g, b);
        } else if(this.shapeObject == 2) {
          var shape = new Square(shader, ev.clientX, ev.clientY, r, g, b);
        } else {
          var shape = new Circle(shader, ev.clientX, ev.clientY, circlePointNumber, r, g, b);
        }

        this.scene.addGeometry(shape);
    }


}
