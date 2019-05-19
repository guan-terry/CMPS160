/**
 * Specifies a tilted cube. A subclass of Geometry
 *
 * @author Terry Guan
 * @this {TiltedCubes}
 */

class tiltedCubes extends Geometry {
  constructor(shader, xPos, yPos, zPos, redVal, greenVal, blueVal, sizeMultiplier, image, isWall) {
    super(shader);

    this.vertices = this.generatetiltedCubes(xPos, yPos, zPos, redVal, greenVal, blueVal, sizeMultiplier, isWall);
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
    this.vertices[0].texCoord = [0,0];
    this.vertices[1].texCoord = [0,1];
    this.vertices[2].texCoord = [1,0];
    this.vertices[3].texCoord = [0,1];
    this.vertices[4].texCoord = [1,0];
    this.vertices[5].texCoord = [1,1];

    //back face of the cubes
    this.vertices[6].texCoord = [0,1];
    this.vertices[7].texCoord = [0,0];
    this.vertices[8].texCoord = [1,1];
    this.vertices[9].texCoord = [0,0];
    this.vertices[10].texCoord = [1,1];
    this.vertices[11].texCoord = [1,0];

    //top face
    this.vertices[12].texCoord = [0,0];
    this.vertices[13].texCoord = [0,1];
    this.vertices[14].texCoord = [1,1];
    this.vertices[15].texCoord = [0,0];
    this.vertices[16].texCoord = [1,1];
    this.vertices[17].texCoord = [1,0];

    //bottom faces
    this.vertices[18].texCoord = [0,0];
    this.vertices[19].texCoord = [0,1];
    this.vertices[20].texCoord = [1,1];
    this.vertices[21].texCoord = [0,0];
    this.vertices[22].texCoord = [1,1];
    this.vertices[23].texCoord = [1,0];

    //right faces
    this.vertices[24].texCoord = [0,1];
    this.vertices[25].texCoord = [0,0];
    this.vertices[26].texCoord = [1,1];
    this.vertices[27].texCoord = [0,0];
    this.vertices[28].texCoord = [1,1];
    this.vertices[29].texCoord = [1,0];

    //left faces
    this.vertices[30].texCoord = [0,1];
    this.vertices[31].texCoord = [0,0];
    this.vertices[32].texCoord = [1,1];
    this.vertices[33].texCoord = [0,0];
    this.vertices[34].texCoord = [1,1];
    this.vertices[35].texCoord = [1,0];

  }

  generatetiltedCubes(xPos, yPos, zPos, redVal, greenVal, blueVal, shapeMultiplier, isWall) {
    var vertices = []
    var wallFloor = 5;
    if (isWall) {
      wallFloor = -.8;
    }
    //pos - center
    //center = xPos + .5, yPos - (WallFloor/2), zPos + .5
    //floor left-most lower corner
    var vertex1 = new Vertex(xPos, wallFloor, zPos, redVal, greenVal, blueVal);
    // normal = -1 , -1, -1
    //floor left-most upper corner
    var vertex2 = new Vertex(xPos, wallFloor, zPos + 1*shapeMultiplier, redVal, greenVal, blueVal);
    // normal = -1, -1, 1
    //wall left-most lower corner
    var vertex3 = new Vertex(xPos, yPos + wallFloor, zPos, redVal, greenVal, blueVal);
    //normal = -1, 1, -1
    //wall left-most upper corner.
    var vertex4 = new Vertex(xPos, yPos + wallFloor, zPos + 1*shapeMultiplier, redVal, greenVal, blueVal);
    //normal = -1, 1, 1
    //floor upper left
    var vertex5 = new Vertex(xPos + 1*shapeMultiplier, wallFloor, zPos, redVal, greenVal, blueVal);
    //normal = 1, -1, -1
    //floor lower Left
    var vertex6 = new Vertex(xPos + 1*shapeMultiplier, wallFloor, zPos + 1*shapeMultiplier, redVal, greenVal, blueVal);
    // normal = 1, -1 , 1
    //wall upper right
    var vertex7 = new Vertex(xPos + 1*shapeMultiplier, yPos + wallFloor, zPos, redVal, greenVal, blueVal);
    //normal = 1, 1, -1
    //wall lower right
    var vertex8 = new Vertex(xPos + 1*shapeMultiplier, yPos + wallFloor, zPos + 1*shapeMultiplier, redVal, greenVal, blueVal);
    //normal = 1, 1, 1
    //front face
    vertices.push(new Vertex(vertex2.point.elements[0], vertex2.point.elements[1], vertex2.point.elements[2], vertex2.color[0], vertex2.color[1], vertex2.color[2], -1.0, -1.0, 1.0));
    vertices.push(new Vertex(vertex1.point.elements[0], vertex1.point.elements[1], vertex1.point.elements[2], vertex1.color[0], vertex1.color[1], vertex1.color[2], -1.0, -1.0, -1.0));
    vertices.push(new Vertex(vertex6.point.elements[0], vertex6.point.elements[1], vertex6.point.elements[2], vertex6.color[0], vertex6.color[1], vertex6.color[2], 1.0, -1.0, 1.0));
    vertices.push(new Vertex(vertex1.point.elements[0], vertex1.point.elements[1], vertex1.point.elements[2], vertex1.color[0], vertex1.color[1], vertex1.color[2], -1.0, -1.0, -1.0));
    vertices.push(new Vertex(vertex6.point.elements[0], vertex6.point.elements[1], vertex6.point.elements[2], vertex6.color[0], vertex6.color[1], vertex6.color[2], 1.0, -1.0, 1.0));
    vertices.push(new Vertex(vertex5.point.elements[0], vertex5.point.elements[1], vertex5.point.elements[2], vertex5.color[0], vertex5.color[1], vertex5.color[2], 1.0, -1.0, -1.0));

    //back face
    vertices.push(new Vertex(vertex4.point.elements[0], vertex4.point.elements[1], vertex4.point.elements[2], vertex4.color[0], vertex4.color[1], vertex4.color[2], -1.0, 1.0, 1.0));
    vertices.push(new Vertex(vertex3.point.elements[0], vertex3.point.elements[1], vertex3.point.elements[2], vertex3.color[0], vertex3.color[1], vertex3.color[2], -1.0, 1.0, -1.0));
    vertices.push(new Vertex(vertex8.point.elements[0], vertex8.point.elements[1], vertex8.point.elements[2], vertex8.color[0], vertex8.color[1], vertex8.color[2], 1.0, 1.0, 1.0));
    vertices.push(new Vertex(vertex3.point.elements[0], vertex3.point.elements[1], vertex3.point.elements[2], vertex3.color[0], vertex3.color[1], vertex3.color[2], -1.0, 1.0, -1.0));
    vertices.push(new Vertex(vertex8.point.elements[0], vertex8.point.elements[1], vertex8.point.elements[2], vertex8.color[0], vertex8.color[1], vertex8.color[2], 1.0, 1.0, 1.0));
    vertices.push(new Vertex(vertex7.point.elements[0], vertex7.point.elements[1], vertex7.point.elements[2], vertex7.color[0], vertex7.color[1], vertex7.color[2], 1.0, 1.0, -1.0));

    //top faces
    vertices.push(new Vertex(vertex2.point.elements[0], vertex2.point.elements[1], vertex2.point.elements[2], vertex2.color[0], vertex2.color[1], vertex2.color[2], -1.0, -1.0, 1.0));
    vertices.push(new Vertex(vertex4.point.elements[0], vertex4.point.elements[1], vertex4.point.elements[2], vertex4.color[0], vertex4.color[1], vertex4.color[2], -1.0, 1.0, 1.0));
    vertices.push(new Vertex(vertex8.point.elements[0], vertex8.point.elements[1], vertex8.point.elements[2], vertex8.color[0], vertex8.color[1], vertex8.color[2], 1.0, 1.0, 1.0));
    vertices.push(new Vertex(vertex2.point.elements[0], vertex2.point.elements[1], vertex2.point.elements[2], vertex2.color[0], vertex2.color[1], vertex2.color[2], -1.0, -1.0, 1.0));
    vertices.push(new Vertex(vertex8.point.elements[0], vertex8.point.elements[1], vertex8.point.elements[2], vertex8.color[0], vertex8.color[1], vertex8.color[2], 1.0, 1.0, 1.0));
    vertices.push(new Vertex(vertex6.point.elements[0], vertex6.point.elements[1], vertex6.point.elements[2], vertex6.color[0], vertex6.color[1], vertex6.color[2], 1.0, -1.0, 1.0));

    //bottom faces
    vertices.push(new Vertex(vertex1.point.elements[0], vertex1.point.elements[1], vertex1.point.elements[2], vertex1.color[0], vertex1.color[1], vertex1.color[2], -1.0, -1.0, -1.0));
    vertices.push(new Vertex(vertex3.point.elements[0], vertex3.point.elements[1], vertex3.point.elements[2], vertex3.color[0], vertex3.color[1], vertex3.color[2], -1.0, 1.0, -1.0));
    vertices.push(new Vertex(vertex7.point.elements[0], vertex7.point.elements[1], vertex7.point.elements[2], vertex7.color[0], vertex7.color[1], vertex7.color[2], 1.0, 1.0, -1.0));
    vertices.push(new Vertex(vertex1.point.elements[0], vertex1.point.elements[1], vertex1.point.elements[2], vertex1.color[0], vertex1.color[1], vertex1.color[2], -1.0, -1.0, -1.0));
    vertices.push(new Vertex(vertex7.point.elements[0], vertex7.point.elements[1], vertex7.point.elements[2], vertex7.color[0], vertex7.color[1], vertex7.color[2], 1.0, 1.0, -1.0));
    vertices.push(new Vertex(vertex5.point.elements[0], vertex5.point.elements[1], vertex5.point.elements[2], vertex5.color[0], vertex5.color[1], vertex5.color[2], 1.0, -1.0, -1.0));

    //right faces
    vertices.push(new Vertex(vertex6.point.elements[0], vertex6.point.elements[1], vertex6.point.elements[2], vertex6.color[0], vertex6.color[1], vertex6.color[2], 1.0, -1.0, 1.0));
    vertices.push(new Vertex(vertex5.point.elements[0], vertex5.point.elements[1], vertex5.point.elements[2], vertex5.color[0], vertex5.color[1], vertex5.color[2], 1.0, -1.0, -1.0));
    vertices.push(new Vertex(vertex8.point.elements[0], vertex8.point.elements[1], vertex8.point.elements[2], vertex8.color[0], vertex8.color[1], vertex8.color[2], 1.0, 1.0, 1.0));
    vertices.push(new Vertex(vertex5.point.elements[0], vertex5.point.elements[1], vertex5.point.elements[2], vertex5.color[0], vertex5.color[1], vertex5.color[2], 1.0, -1.0, -1.0));
    vertices.push(new Vertex(vertex8.point.elements[0], vertex8.point.elements[1], vertex8.point.elements[2], vertex8.color[0], vertex8.color[1], vertex8.color[2], 1.0, 1.0, 1.0));
    vertices.push(new Vertex(vertex7.point.elements[0], vertex7.point.elements[1], vertex7.point.elements[2], vertex7.color[0], vertex7.color[1], vertex7.color[2], 1.0, 1.0, -1.0));

    //left faces
    //3
    vertices.push(new Vertex(vertex2.point.elements[0], vertex2.point.elements[1], vertex2.point.elements[2], vertex2.color[0], vertex2.color[1], vertex2.color[2], -1.0, -1.0, 1.0));
    //4
    vertices.push(new Vertex(vertex1.point.elements[0], vertex1.point.elements[1], vertex1.point.elements[2], vertex1.color[0], vertex1.color[1], vertex1.color[2], -1.0, -1.0, -1.0));
    //7
    vertices.push(new Vertex(vertex4.point.elements[0], vertex4.point.elements[1], vertex4.point.elements[2], vertex4.color[0], vertex4.color[1], vertex4.color[2], -1.0, 1.0, 1.0));
    //3
    vertices.push(new Vertex(vertex1.point.elements[0], vertex1.point.elements[1], vertex1.point.elements[2], vertex1.color[0], vertex1.color[1], vertex1.color[2], -1.0, -1.0, -1.0));
    //7
    vertices.push(new Vertex(vertex4.point.elements[0], vertex4.point.elements[1], vertex4.point.elements[2], vertex4.color[0], vertex4.color[1], vertex4.color[2], -1.0, 1.0, 1.0));
    //8
    vertices.push(new Vertex(vertex3.point.elements[0], vertex3.point.elements[1], vertex3.point.elements[2], vertex3.color[0], vertex3.color[1], vertex3.color[2], -1.0, 1.0, -1.0));

    return vertices;

  }


}
