/**
 * Specifies a tilted cube. A subclass of Geometry
 *
 * @author Terry Guan
 * @this {TiltedCubes}
 */

class tiltedCubes extends Geometry {
  constructor(shader, xPos, yPos, zPos, redVal, greenVal, blueVal, sizeMultiplier, image) {
    super(shader);

    this.vertices = this.generatetiltedCubes(xPos, yPos, zPos, redVal, greenVal, blueVal, sizeMultiplier);
    this.faces = {
      0: this.vertices
    };
    this.image = null;
    if (image != null) {
      console.log("image is not null")
      this.image = image;
    }

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

  generatetiltedCubes(xPos, yPos, zPos, redVal, greenVal, blueVal, shapeMultiplier) {
    var vertices = []
    //floor left-most lower corner
    var vertex1 = new Vertex(xPos, -.8, zPos, redVal, greenVal, blueVal);
    //floor left-most upper corner
    var vertex2 = new Vertex(xPos, -.8, zPos + 1, redVal, greenVal, blueVal);
    //wall left-most lower corner
    var vertex3 = new Vertex(xPos, yPos - .8, zPos, redVal, greenVal, blueVal);
    //wall left-most upper corner.
    var vertex4 = new Vertex(xPos, yPos - .8, zPos + 1, redVal, greenVal, blueVal);
    //floor upper left
    var vertex5 = new Vertex(xPos + 1, -.8, zPos, redVal, greenVal, blueVal);
    //floor lower Left
    var vertex6 = new Vertex(xPos + 1, -.8, zPos + 1, redVal, greenVal, blueVal);
    //wall upper right
    var vertex7 = new Vertex(xPos + 1, yPos - .8, zPos, redVal, greenVal, blueVal);
    //wall lower right
    var vertex8 = new Vertex(xPos + 1, yPos - .8, zPos + 1, redVal, greenVal, blueVal);

    //front face
    vertices.push(new Vertex(vertex2));
    vertices.push(new Vertex(vertex1));
    vertices.push(new Vertex(vertex6));
    vertices.push(new Vertex(vertex1));
    vertices.push(new Vertex(vertex6));
    vertices.push(new Vertex(vertex5));

    //back face
    vertices.push(new Vertex(vertex4));
    vertices.push(new Vertex(vertex3));
    vertices.push(new Vertex(vertex8));
    vertices.push(new Vertex(vertex3));
    vertices.push(new Vertex(vertex8));
    vertices.push(new Vertex(vertex7));

    //top faces
    vertices.push(new Vertex(vertex2));
    vertices.push(new Vertex(vertex4));
    vertices.push(new Vertex(vertex8));
    vertices.push(new Vertex(vertex2));
    vertices.push(new Vertex(vertex8));
    vertices.push(new Vertex(vertex6));

    //bottom faces
    vertices.push(new Vertex(vertex1));
    vertices.push(new Vertex(vertex3));
    vertices.push(new Vertex(vertex4));
    vertices.push(new Vertex(vertex1));
    vertices.push(new Vertex(vertex4));
    vertices.push(new Vertex(vertex5));

    //right faces
    vertices.push(new Vertex(vertex6));
    vertices.push(new Vertex(vertex5));
    vertices.push(new Vertex(vertex8));
    vertices.push(new Vertex(vertex5));
    vertices.push(new Vertex(vertex8));
    vertices.push(new Vertex(vertex7));

    //left faces
    //3
    vertices.push(new Vertex(vertex2));
    //4
    vertices.push(new Vertex(vertex1));
    //7
    vertices.push(new Vertex(vertex4));
    //3
    vertices.push(new Vertex(vertex1));
    //7
    vertices.push(new Vertex(vertex4));
    //8
    vertices.push(new Vertex(vertex3));

    return vertices;

  }


}
