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
  constructor(shader, xPos, yPos, zPos, redVal, greenVal, blueVal) {
    super(shader);
    //var xVal = (xPos - 200) / 200;
    //var yVal = ((yPos - 200) / 200) * -1;

    this.vertices = this.generateSquareVertices(xPos, yPos, zPos, redVal, greenVal, blueVal, 3.2);
    this.faces = {
      0: this.vertices
    };
    /*this.modelMatrix = new Matrix4();
    this.translationMatrix = new Matrix4();
    this.translationMatrix.setTranslate(xVal, yVal, 0);

    this.translationMatrixNegative = new Matrix4();
    this.translationMatrixNegative.setTranslate(xVal * -1, yVal * -1, 0);

    this.rotationMatrix = new Matrix4();
    this.rotationMatrix.setRotate(1, 0, 0, 1);
    */
    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
    this.interleaveVertices();
  }

  generateSquareVertices(xPos, yPos, zPos, redVal, greenVal, blueVal, shapeMultiplier) {
    var vertices = []

    /*    if (isRainbow) {
          //upper left
          var vertex1 = new Vertex(xPos - (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier), 0.0, Math.random(), Math.random(), Math.random());
          //lower left
          var vertex2 = new Vertex(xPos - (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier), 0.0, Math.random(), Math.random(), Math.random());
          //upper right
          var vertex3 = new Vertex(xPos + (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier), 0.0, Math.random(), Math.random(), Math.random());
          //lower right
          var vertex4 = new Vertex(xPos + (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier), 0.0, Math.random(), Math.random(), Math.random());
        } else {
        */
    //upper left
    var vertex1 = new Vertex(xPos - (shapeMultiplier), yPos, zPos + (shapeMultiplier), redVal, greenVal, blueVal);
    //lower left
    var vertex2 = new Vertex(xPos - (shapeMultiplier), yPos, zPos - (shapeMultiplier), redVal, greenVal, blueVal);
    //upper right
    var vertex3 = new Vertex(xPos + (shapeMultiplier), yPos, zPos + (shapeMultiplier), redVal, greenVal, blueVal);
    //lower right
    var vertex4 = new Vertex(xPos + (shapeMultiplier), yPos, zPos - (shapeMultiplier), redVal, greenVal, blueVal);
    var vertex1 = new Vertex(-32, -.8, -32, 255, 0, 0);
    var vertex2 = new Vertex(-32, -.8, 32, 255, 0, 0);
    var vertex3 = new Vertex(32, -.8, -32, 255, 0, 0);
    var vertex4 = new Vertex(32, -.8, 32, 255, 0, 0);

    vertices.push(vertex1);
    vertices.push(vertex2);
    vertices.push(vertex3);
    vertices.push(vertex2);
    vertices.push(vertex3);
    vertices.push(vertex4);

    return vertices;
  }

  /*
    render() {
      this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
      this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
      this.modelMatrix = this.modelMatrix.multiply(this.translationMatrixNegative);
      this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    }
    */
}
