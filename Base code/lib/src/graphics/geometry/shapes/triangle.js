/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Triangle} Triangle created
   */
  constructor(shader,xPos, yPos, redVal, greenVal, blueVal, sizeMultiplier) {
      super(shader);
      console.log(xPos, yPos);
      var xVal = (xPos-200)/200;  
      var yVal = ((yPos-200)/200) * -1;
      console.log(sizeMultiplier);

      this.vertices = this.generateTriangleVertices(xVal,yVal, redVal, greenVal, blueVal, sizeMultiplier);
      this.faces = {0: this.vertices};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateTriangleVertices(xPos, yPos, redVal, greenVal, blueVal, sizeMultiplier) {
      var vertices = []
      console.log("xPos is: " + xPos);
      console.log("yPos is: " + yPos);
      var vertex1 = new Vertex( xPos, yPos+(0.135 * sizeMultiplier), 0.0, redVal, greenVal, blueVal);
      var vertex2 = new Vertex( xPos-(0.135*sizeMultiplier), yPos-(0.135 * sizeMultiplier), 0.0, redVal, greenVal, blueVal);
      var vertex3 = new Vertex( xPos+(0.135*sizeMultiplier), yPos - (0.135 * sizeMultiplier), 0.0, redVal, greenVal, blueVal);

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      console.log(xPos, yPos+(0.135 * sizeMultiplier));
      console.log(xPos-(0.135*sizeMultiplier), yPos-(0.135 * sizeMultiplier));
      console.log(xPos+(0.135*sizeMultiplier), yPos - (0.135 * sizeMultiplier));
      return vertices;
  }
}
