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
  constructor(shader,xPos, yPos, circlePointNumber, redVal, greenVal, blueVal, sizeMultiplier) {
      super(shader);
      //console.log(xPos, yPos);
      var xVal = (xPos-200)/200;
      var yVal = ((yPos-200)/200) * -1;
      this.movement = 0;
      this.movementSideways = 0;
      this.movementOrigin = 0;

      this.vertices = this.generateCircleVertices(xVal, yVal, circlePointNumber, redVal, greenVal, blueVal, sizeMultiplier);
      this.faces = {0: this.vertices};
      var randomMovementX = Math.random()/10;
      var randomMovementY = Math.random()/10;

      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(randomMovementX*-1, randomMovementY*-1, 0);

      this.translationMatrixMovement = new Matrix4();
      this.translationMatrixMovement.setTranslate(randomMovementX, 0 ,0);

      this.translationMatrixMoveBack = new Matrix4();
      this.translationMatrixMoveBack.setTranslate(0, randomMovementY, 0);



      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateCircleVertices(xPos, yPos, pointVal, redVal, greenVal, blueVal, shapeMultiplier) {
      var vertices = []
      var size = 7 / shapeMultiplier;
      //console.log("xPos is: " + xPos);
      //console.log("yPos is: " + yPos);
      var rad = 0;
      var circlePoints = (2*Math.PI/pointVal);
      //console.log("circle points is: " + circlePoints);
      for(var i = 0; i <= pointVal; i++) {
        //console.log("rad is: " + rad);
        var x = (Math.cos(rad)/size) + xPos;
        var y = (Math.sin(rad)/size) + yPos;
        var vertexPoint = new Vertex(x, y, 0, redVal, greenVal, blueVal);
        rad = (rad + circlePoints);
        //console.log(x,y);
        x = (Math.cos(rad)/size) + xPos;
        y = (Math.sin(rad)/size) + yPos;
        vertices.push(new Vertex(xPos, yPos, 0, redVal, greenVal, blueVal));
        vertices.push(new Vertex(x, y, 0, redVal, greenVal, blueVal));
        vertices.push(vertexPoint);
      }
      //console.log(vertices);


      //console.log(vertices);
      return vertices;
  }
  render() {
    if (this.movement < 50) {
      this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
      this.movement++;
    } else if(this.movementSideways < 50) {
      this.modelMatrix = this.modelMatrix.multiply(this.translationMatrixMovement);
      this.movementSideWays++;
    } else if(this.movementOrigin < 50){
      this.modelMatrix = this.modelMatrix.multiply(this.translationMatrixMoveBack);
      this.movementOrigin++;
    } else {
      this.movement = 0;
      this.movementOrigin =0;
      this.movementSideWays=0;
    }
    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    return;
  }
}
