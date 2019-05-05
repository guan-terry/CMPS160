/**
 * Specifies a Circle. A subclass of geometry.
 *
 * @author Terry Guan
 * @this {Circle}
 */
class movingCircles extends Geometry {
  /**
   * Constructor for Circle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Circle} Circle created
   */
  constructor(shader, xPos, yPos, circlePointNumber, redVal, greenVal, blueVal, sizeMultiplier, isRainbow) {
    super(shader);
    //console.log(xPos, yPos);
    this.xVal = (xPos - 200) / 200;
    this.yVal = ((yPos - 200) / 200) * -1;
    this.randomMovementTime = (Math.random() * 25) + 25;
    this.movement = 0;
    this.modelMatrix = new Matrix4();

    this.vertices = this.generateCircleVertices(this.xVal, this.yVal, circlePointNumber, redVal, greenVal, blueVal, sizeMultiplier, isRainbow);
    this.faces = {
      0: this.vertices
    };
    var randomNegX = Math.random();
    if (randomNegX > .5) {
      randomNegX = -1;
    } else {
      randomNegX = 1;
    }
    var randomNegY = Math.random();
    if (randomNegY > .5) {
      randomNegY = -1;
    } else {
      randomNegY = 1;
    }
    this.randomMovementX = (Math.random() / 10 + .02) / 20 * randomNegX;
    this.randomMovementY = (Math.random() / 10 + .02) / 20 * randomNegY;

    this.translationMatrix = new Matrix4();
    this.translationMatrix.setTranslate(this.randomMovementX * -1, this.randomMovementY * -1, 0);


    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
    this.interleaveVertices();
  }

  generateCircleVertices(xPos, yPos, pointVal, redVal, greenVal, blueVal, shapeMultiplier, isRainbow) {
    var vertices = []
    var size = 7 / shapeMultiplier;
    //console.log("xPos is: " + xPos);
    //console.log("yPos is: " + yPos);
    var rad = 0;
    var circlePoints = (2 * Math.PI / pointVal);
    //console.log("circle points is: " + circlePoints);
    for (var i = 0; i <= pointVal; i++) {
      //console.log("rad is: " + rad);
      var x = (Math.cos(rad) / size) + xPos;
      var y = (Math.sin(rad) / size) + yPos;
      if (isRainbow) {
        var vertexPoint = new Vertex(x, y, 0, Math.random()*256, Math.random()*256, Math.random()*256);
      } else {
        var vertexPoint = new Vertex(x, y, 0, redVal, greenVal, blueVal);
      }
      rad = (rad + circlePoints);
      //console.log(x,y);
      x = (Math.cos(rad) / size) + xPos;
      y = (Math.sin(rad) / size) + yPos;
      if (isRainbow) {
        vertices.push(new Vertex(xPos, yPos, 0, Math.random()*256, Math.random()*256, Math.random()*256))
        vertices.push(new Vertex(x, y, 0, Math.random()*256, Math.random()*256, Math.random()*256));
      } else {
        vertices.push(new Vertex(xPos, yPos, 0, redVal, greenVal, blueVal));
        vertices.push(new Vertex(x, y, 0, redVal, greenVal, blueVal));
      }
      vertices.push(vertexPoint);
    }
    //console.log(vertices);


    //console.log(vertices);
    return vertices;
  }

  render() {
    if (this.movement < this.randomMovementTime) {
      this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
      this.movement++;
    } else {
      var randomNegX = Math.random();
      if (randomNegX > .5) {
        randomNegX = -1;
      } else {
        randomNegX = 1;
      }
      var randomNegY = Math.random();
      if (randomNegY > .5) {
        randomNegY = -1;
      } else {
        randomNegY = 1;
      }
      this.randomMovementX = (Math.random() / 10 + .02) / 20 * randomNegX;
      this.randomMovementY = (Math.random() / 10 + .02) / 20 * randomNegY;
      this.movement = 0;
      this.randomMovementTime = (Math.random() * 25) + 25;
      this.translationMatrix.setTranslate(this.randomMovementX, this.randomMovementY, 0);

    }
    //console.log(this.randomMovementTime);
    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    return;
  }
}
