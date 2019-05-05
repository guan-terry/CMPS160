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
  constructor(shader, xPos, yPos, redVal, greenVal, blueVal, sizeMultiplier, isRainbow) {
    super(shader);

    this.modelMatrix = new Matrix4();
    this.rotationMatrix = new Matrix4();
    this.rotationMatrix.setRotate(5, 0, 0, 1);

    this.scalingMatrix = new Matrix4();
    this.scalingMatrix.setScale(1.01, 1.01, 0);

    this.scaling = 0;
    this.scalingBackwards = 0;

    var xVal = (xPos - 200) / 200;
    var yVal = ((yPos - 200) / 200) * -1;
    this.vertices = this.generateTriangleVertices(xVal, yVal,
      redVal, greenVal, blueVal, sizeMultiplier, isRainbow);

    this.translationMatrix = new Matrix4();
    this.translationMatrix.setTranslate(xVal, yVal, 0);
    //console.log(xVal, yVal);
    //console.log(this.translationMatrix)

    this.translationMatrixNegative = new Matrix4();
    this.translationMatrixNegative.setTranslate(xVal * -1, yVal * -1, 0);

    this.scalingMatrixNegative = new Matrix4();
    this.scalingMatrixNegative.setScale(.99, .99, 0);



    this.faces = {
      0: [0, 1, 2]
    };
    this.rot = 0;
    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
    this.interleaveVertices();
  }

  generateTriangleVertices(xPos, yPos, redVal, greenVal, blueVal, sizeMultiplier, isRainbow) {
    var vertices = []
    if (isRainbow) {
      //console.log("isRainbow ran Inside");
      var vertex1 = new Vertex(xPos, yPos + (0.135 * sizeMultiplier), 0.0, Math.random()*256, Math.random()*256, Math.random()*256);
      var vertex2 = new Vertex(xPos - (0.135 * sizeMultiplier), yPos - (0.135 * sizeMultiplier), 0.0, Math.random()*256, Math.random()*256, Math.random()*256);
      var vertex3 = new Vertex(xPos + (0.135 * sizeMultiplier), yPos - (0.135 * sizeMultiplier), 0.0, Math.random()*256, Math.random()*256, Math.random()*256);
    } else {
      var vertex1 = new Vertex(xPos, yPos + (0.135 * sizeMultiplier), 0.0, redVal, greenVal, blueVal);
      var vertex2 = new Vertex(xPos - (0.135 * sizeMultiplier), yPos - (0.135 * sizeMultiplier), 0.0, redVal, greenVal, blueVal);
      var vertex3 = new Vertex(xPos + (0.135 * sizeMultiplier), yPos - (0.135 * sizeMultiplier), 0.0, redVal, greenVal, blueVal);
    }
    //var vertex1 = new Vertex(1,1,0,1,0,0);
    //var vertex2 = new Vertex(0,0,0,1,0,0);
    //var vertex3 = new Vertex(1,0,0,1,0,0);
    //console.log(redVal, greenVal, blueVal);
    //console.log(xPos, yPos);
    //console.log(vertex1);
    //console.log(vertex2);
    //console.log(vertex3);
    vertices.push(vertex1);
    vertices.push(vertex2);
    vertices.push(vertex3);

    return vertices;
  }

  render() {
    //console.log(this.modelMatrix);
    this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
    if (this.scaling < 50) {
      this.scaling++;
      this.modelMatrix = this.modelMatrix.multiply(this.scalingMatrix);
    } else {
      this.modelMatrix = this.modelMatrix.multiply(this.scalingMatrixNegative);
      this.scalingBackwards++;
      if (this.scalingBackwards == 50) {
        this.scalingBackwards = 0;
        this.scaling = 0;
      }
    }
    this.modelMatrix = this.modelMatrix.multiply(this.translationMatrixNegative);

    //console.log(this.modelMatrix);
    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    return;
  }
}
