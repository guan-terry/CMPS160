/**
 * Specifies a tilted cube. A subclass of Geometry
 *
 * @author Terry Guan
 * @this {TiltedCubes}
 */

class tiltedCubes extends Geometry {
  constructor(shader, xPos, yPos, redVal, greenVal, blueVal, sizeMultiplier, image) {
    super(shader);
    this.xVal = (xPos - 200) / 200;
    this.yVal = ((yPos - 200) / 200) * -1;
    this.vertices = this.generatetiltedCubes(this.xVal, this.yVal, redVal, greenVal, blueVal, sizeMultiplier);
    this.faces = {
      0: this.vertices
    };
    this.image = null;
    if (image != null) {
      this.image = image;
    }

    this.modelMatrix = new Matrix4();

    this.translationMatrix = new Matrix4();
    this.translationMatrix.setTranslate(this.xVal, this.yVal, 0);

    this.translationMatrixNegative = new Matrix4();
    this.translationMatrixNegative.setTranslate(-this.xVal, -this.yVal, 0);

    this.rotationMatrix = new Matrix4();
    this.rotationMatrix.setRotate(1, 0, 100, 1);
    if (this.image != null) {
      this.addVertexTextureCoordinates();
    }
    this.interleaveVertices();
  }

  addVertexTextureCoordinates() {
    //front face of the cube
    this.vertices[0].uv = [0,1];
    this.vertices[1].uv = [0,0];
    this.vertices[2].uv = [1,1];
    this.vertices[3].uv = [0,0];
    this.vertices[4].uv = [1,1];
    this.vertices[5].uv = [1,0];

    //back face of the cubes
    this.vertices[6].uv = [0,1];
    this.vertices[7].uv = [0,0];
    this.vertices[8].uv = [1,1];
    this.vertices[9].uv = [0,0];
    this.vertices[10].uv = [1,1];
    this.vertices[11].uv = [1,0];

    //top face
    this.vertices[12].uv = [0,0];
    this.vertices[13].uv = [0,1];
    this.vertices[14].uv = [1,1];
    this.vertices[15].uv = [0,0];
    this.vertices[16].uv = [1,1];
    this.vertices[17].uv = [1,0];

    //bottom faces
    this.vertices[18].uv = [0,0];
    this.vertices[19].uv = [0,1];
    this.vertices[20].uv = [1,1];
    this.vertices[21].uv = [0,0];
    this.vertices[22].uv = [1,1];
    this.vertices[23].uv = [1,0];

    //right faces
    this.vertices[24].uv = [0,1];
    this.vertices[25].uv = [0,0];
    this.vertices[26].uv = [1,1];
    this.vertices[27].uv = [0,0];
    this.vertices[28].uv = [1,1];
    this.vertices[29].uv = [1,0];

    //left faces
    this.vertices[30].uv = [0,1];
    this.vertices[31].uv = [0,0];
    this.vertices[32].uv = [1,1];
    this.vertices[33].uv = [0,0];
    this.vertices[34].uv = [1,1];
    this.vertices[35].uv = [1,0];

  }

  generatetiltedCubes(xPos, yPos, redVal, greenVal, blueVal, shapeMultiplier) {
    var vertices = []
    //front upper Left
    var vertex1 = new Vertex(xPos - (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier), -.1 * shapeMultiplier, redVal, greenVal, blueVal);
    //front lower left
    var vertex2 = new Vertex(xPos - (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier), 0, redVal, greenVal, blueVal);
    //front upper right
    var vertex3 = new Vertex(xPos + (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier), -.1 * shapeMultiplier, redVal, greenVal, blueVal);
    //front lower right
    var vertex4 = new Vertex(xPos + (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier), 0, redVal, greenVal, blueVal);
    //back upper left
    var vertex5 = new Vertex(xPos - (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1), redVal, greenVal, blueVal);
    //back lower Left
    var vertex6 = new Vertex(xPos - (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1) + .1 * shapeMultiplier, redVal, greenVal, blueVal);
    //back upper right
    var vertex7 = new Vertex(xPos + (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1), redVal, greenVal, blueVal);
    //back lower right
    var vertex8 = new Vertex(xPos + (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1) + .1 * shapeMultiplier, redVal, greenVal, blueVal);

    //front face
    vertices.push(new Vertex(xPos - (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier), -.1 * shapeMultiplier, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos - (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier), 0, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier), -.1 * shapeMultiplier, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos - (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier), 0, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier), -.1 * shapeMultiplier, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier), 0, redVal, greenVal, blueVal));

    //back face
    vertices.push(new Vertex(xPos - (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1), redVal, greenVal, blueVal));
    vertices.push( new Vertex(xPos - (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1) + .1 * shapeMultiplier, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1), redVal, greenVal, blueVal));
    vertices.push( new Vertex(xPos - (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1) + .1 * shapeMultiplier, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1), redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1) + .1 * shapeMultiplier, redVal, greenVal, blueVal));

    //top faces
    vertices.push(new Vertex(xPos - (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier), -.1 * shapeMultiplier, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos - (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1), redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1), redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos - (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier), -.1 * shapeMultiplier, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1), redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier), -.1 * shapeMultiplier, redVal, greenVal, blueVal));

    //bottom faces
    vertices.push(new Vertex(xPos - (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier), 0, redVal, greenVal, blueVal));
    vertices.push( new Vertex(xPos - (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1) + .1 * shapeMultiplier, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1) + .1 * shapeMultiplier, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos - (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier), 0, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1) + .1 * shapeMultiplier, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier), 0, redVal, greenVal, blueVal));

    //right faces
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier), -.1 * shapeMultiplier, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier), 0, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1), redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier), 0, redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1), redVal, greenVal, blueVal));
    vertices.push(new Vertex(xPos + (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1) + .1 * shapeMultiplier, redVal, greenVal, blueVal));

    //left faces
    //3
    vertices.push(new Vertex(xPos - (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier), -.1 * shapeMultiplier, redVal, greenVal, blueVal));
    //4
    vertices.push(new Vertex(xPos - (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier), 0, redVal, greenVal, blueVal));
    //7
    vertices.push(new Vertex(xPos - (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1), redVal, greenVal, blueVal));
    //3
    vertices.push(new Vertex(xPos - (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier), 0, redVal, greenVal, blueVal));
    //7
    vertices.push(new Vertex(xPos - (0.135 * shapeMultiplier), yPos + (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1), redVal, greenVal, blueVal));
    //8
    vertices.push( new Vertex(xPos - (0.135 * shapeMultiplier), yPos - (0.135 * shapeMultiplier) + .1 * shapeMultiplier, ((0.135 * shapeMultiplier) + .1) + .1 * shapeMultiplier, redVal, greenVal, blueVal));

    return vertices;

  }


}
