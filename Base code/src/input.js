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

      // Mouse Events
      this.canvas.onmousedown = function(ev) { _inputHandler.click(ev) };
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
        console.log("input.js red = " + r);
        var shape = new Triangle(shader, ev.clientX, ev.clientY, r, g, b);
        this.scene.addGeometry(shape);
    }
}
