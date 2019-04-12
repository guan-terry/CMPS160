/**
 * Specifies a square. A subclass of geometry.
 *
 * @author Terry Guan
 * @this {Square}
 */
class Square extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Square} Square created
   */
  constructor(shader,xPos, yPos, redVal, greenVal, blueVal) {
      super(shader);
      console.log(xPos, yPos);
      var xVal = (xPos-200)/200;  
      var yVal = ((yPos-200)/200) * -1;

      this.vertices = this.generateSquareVertices(xVal,yVal, redVal, greenVal, blueVal);
      this.faces = {0: this.vertices};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSquareVertices(xPos, yPos, redVal, greenVal, blueVal) {
      var vertices = []
      //console.log("xPos is: " + xPos);
      //console.log("yPos is: " + yPos);
      var vertex1 = new Vertex( xPos-0.135, yPos+0.135, 0.0, redVal, greenVal, blueVal);
      var vertex2 = new Vertex( xPos-0.135, yPos-0.135, 0.0, redVal, greenVal, blueVal);
      var vertex3 = new Vertex( xPos+0.135, yPos+0.135, 0.0, redVal, greenVal, blueVal);
      var vertex4 = new Vertex( xPos+0.135, yPos-0.135, 0.0, redVal, greenVal, blueVal);

      console.log(xPos-0.135, yPos+0.135);
      console.log(xPos-0.135, yPos-0.135);
      console.log(xPos+0.135, yPos+0.135);
      console.log(xPos+0.135, yPos-0.135);

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex4);
      vertices.push(vertex3);

      return vertices;
  }
}
