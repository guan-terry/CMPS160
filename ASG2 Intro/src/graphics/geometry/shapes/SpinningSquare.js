/**
 * Specifies a square. A subclass of geometry.
 *
 * @author Terry Guan
 * @this {Square}
 */
class spinningSquare extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Square} Square created
   */
  constructor(shader,xPos, yPos, redVal, greenVal, blueVal, sizeMultiplier) {
      super(shader);
      //console.log(xPos, yPos);
      var xVal = (xPos-200)/200;
      var yVal = ((yPos-200)/200) * -1;

      this.vertices = this.generateSquareVertices(xVal,yVal, redVal, greenVal, blueVal, sizeMultiplier);
      this.faces = {0: this.vertices};

      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(xVal,yVal,0);

      this.translationMatrixNegative = new Matrix4();
      this.translationMatrixNegative.setTranslate(xVal*-1, yVal*-1, 0);

      this.rotationMatrix = new Matrix4();
      this.rotationMatrix.setRotate(1, 0, 0, 1);
      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSquareVertices(xPos, yPos, redVal, greenVal, blueVal, shapeMultiplier) {
      var vertices = []
      console.log("xPos is: " + xPos);
      console.log("yPos is: " + yPos);
      //upper left
      var vertex1 = new Vertex( xPos-(0.135*shapeMultiplier), yPos+(0.135*shapeMultiplier), 0.0, redVal, greenVal, blueVal);
      //lower left
      var vertex2 = new Vertex( xPos-(0.135*shapeMultiplier), yPos-(0.135*shapeMultiplier), 0.0, redVal, greenVal, blueVal);
      //upper right
      var vertex3 = new Vertex( xPos+(0.135*shapeMultiplier), yPos+(0.135*shapeMultiplier), 0.0, redVal, greenVal, blueVal);
      //lower right
      var vertex4 = new Vertex( xPos+(0.135*shapeMultiplier), yPos-(0.135*shapeMultiplier), 0.0, redVal, greenVal, blueVal);

      /*console.log(xPos-0.135, yPos+0.135);
      console.log(xPos-0.135, yPos-0.135);
      console.log(xPos+0.135, yPos+0.135);
      console.log(xPos+0.135, yPos-0.135);
      */
      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);

      return vertices;
  }
  render() {
    this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
    this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
    this.modelMatrix = this.modelMatrix.multiply(this.translationMatrixNegative);
    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
}
