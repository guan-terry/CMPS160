/**
  * Specifies a tilted cube. A subclass of Geometry
  *
  * @author Terry Guan
  * @this {TiltedCubes}
  */

class tiltedCubes extends Geometry {
  constructor(shader,xPos, yPos, redVal, greenVal, blueVal, sizeMultiplier) {
    super(shader);
    this.xVal = (xPos-200)/200;
    this.yVal = ((yPos-200)/200) * -1;
    this.vertices = this.generatetiltedCubes(this.xVal, this.yVal, redVal, greenVal, blueVal, sizeMultiplier);
    this.faces = {0: this.vertices};

    this.modelMatrix = new Matrix4();

    this.translationMatrix = new Matrix4();
    this.translationMatrix.setTranslate(this.xVal, this.yVal, 0);

    this.translationMatrixNegative = new Matrix4();
    this.translationMatrixNegative.setTranslate(-this.xVal, -this.yVal, 0);

    this.rotationMatrix = new Matrix4();
    this.rotationMatrix.setRotate(1, 0, 100, 1);

    this.interleaveVertices();
  }

  generatetiltedCubes(xPos, yPos, redVal, greenVal, blueVal, shapeMultiplier) {
      var vertices = []
      //front upper Left
      var vertex1 = new Vertex(xPos-(0.135*shapeMultiplier), yPos+(0.135*shapeMultiplier), -.1*shapeMultiplier, redVal ,greenVal, blueVal);
      //front lower left
      var vertex2 = new Vertex(xPos-(0.135*shapeMultiplier), yPos-(0.135*shapeMultiplier), 0, redVal, greenVal, blueVal);
      //front upper right
      var vertex3 = new Vertex(xPos+(0.135*shapeMultiplier), yPos+(0.135*shapeMultiplier), -.1*shapeMultiplier, redVal, greenVal, blueVal);
      //front lower right
      var vertex4 = new Vertex(xPos+(0.135*shapeMultiplier), yPos-(0.135*shapeMultiplier), 0, redVal, greenVal, blueVal);
      //back upper left
      var vertex5 = new Vertex(xPos-(0.135*shapeMultiplier), yPos+(0.135*shapeMultiplier)+.1*shapeMultiplier, ((0.135*shapeMultiplier)+.1), redVal, greenVal, blueVal);
      //back lower Left
      var vertex6 = new Vertex(xPos-(0.135*shapeMultiplier), yPos-(0.135*shapeMultiplier)+.1*shapeMultiplier, ((0.135*shapeMultiplier)+.1)+.1*shapeMultiplier, redVal, greenVal, blueVal);
      //back upper right
      var vertex7 = new Vertex(xPos+(0.135*shapeMultiplier), yPos+(0.135*shapeMultiplier)+.1*shapeMultiplier, ((0.135*shapeMultiplier)+.1), redVal, greenVal, blueVal);
      //back lower right
      var vertex8 = new Vertex(xPos+(0.135*shapeMultiplier), yPos-(0.135*shapeMultiplier)+.1*shapeMultiplier, ((0.135*shapeMultiplier)+.1)+.1*shapeMultiplier, redVal, greenVal, blueVal);

      //front face
      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);

      //back face
      vertices.push(vertex5);
      vertices.push(vertex6);
      vertices.push(vertex7);
      vertices.push(vertex6);
      vertices.push(vertex7);
      vertices.push(vertex8);

      //top faces
      vertices.push(vertex1);
      vertices.push(vertex5);
      vertices.push(vertex7);
      vertices.push(vertex1);
      vertices.push(vertex7);
      vertices.push(vertex3);

      //bottom faces
      vertices.push(vertex2);
      vertices.push(vertex6);
      vertices.push(vertex8);
      vertices.push(vertex2);
      vertices.push(vertex8);
      vertices.push(vertex4);

      //right faces
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex8);
      vertices.push(vertex3);
      vertices.push(vertex7);
      vertices.push(vertex8);

      //left faces
      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex6);
      vertices.push(vertex1);
      vertices.push(vertex5);
      vertices.push(vertex6);

      return vertices;

  }

  render() {
    this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
    this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
    this.modelMatrix = this.modelMatrix.multiply(this.translationMatrixNegative);
    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }


}
