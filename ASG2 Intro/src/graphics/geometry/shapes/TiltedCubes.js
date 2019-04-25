/**
  * Specifies a tilted cube. A subclass of Geometry
  *
  * @author Terry Guan
  * @this {TiltedCubes}
  */

class tiltedCubes extends Goemetry {
  constructor(shader,xPos, yPos, redVal, greenVal, blueVal, sizeMultiplier) {
    super(shader);
    this.xVal = (xPos-200)/200;
    this.yVal = ((yVal-200)/200) * -1;
    this.vertices = this.generatetiltedCubes(this.xVal, this.yVal, redVal, greenVal, blueVal, sizeMultiplier);
    this.faces = {0: this.vertices};

    this.interleaveVertices();
  }

  generatetiltedCubes(xPos, yPos, redVal, greenVal, blueVal, sizeMultiplier) {
      //front upper Left
      var vertex1 = new Vertex(xPos-(0.135*shapeMultiplier), yPos+(0.135*shapeMultiplier), 0, redVal ,greenVal, blueVal);
      //front lower left
      var vertex2 = new Vertex(xPos-(0.135*shapeMultiplier), yPos-(0.135*shapeMultiplier), 0, redVal, greenVal, blueVal);
      //front upper left
      var vertex3 = new Vertex(xPos+(0.135*shapeMultiplier), yPos+(0.135*shapeMultiplier), 0, redVal, greenVal, blueVal);
      //front lower right
      var vertex4 = new Vertex(xPos+(0.135*shapeMultiplier), yPos-(0.135*shapeMultiplier), 0, redVal, greenVal, blueVal);
  }



}
