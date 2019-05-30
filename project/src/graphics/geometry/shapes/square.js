/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class square extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Triangle} Triangle created
   */
  constructor(shader, x, y, z, r, g, b, xSize, ySize, image) {
    super(shader);

    this.xSize = xSize;
    this.ySize = ySize;
    this.image = image;
    this.jump = false;
    this.flash = false;
    this.flashData = [0,0,0];

    this.vertices = this.generateTriangleVertices(x, y, z, r, g, b, xSize, ySize);
    this.faces = {
      0: [0, 1, 2]
    };
    this.jumping = 0;
    this.flashTimer = 0;
    this.jumpDuration = 0;

    this.translationMatrix = new Matrix4();
    this.translationMatrix.setTranslate(0, .02, 0);

    this.negTranslationMatrix = new Matrix4();
    this.negTranslationMatrix.setTranslate(0, -.02, 0);

    this.moveMatrix = new Matrix4();
    this.moveMatrix.setTranslate(-.02, 0, 0);

    this.modelMatrix = new Matrix4();

    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
    this.interleaveVertices();
  }

  test(jumpDuration) {
    this.jump = true;
    this.jumpDuration = jumpDuration;
  }

  flashGround() {
    this.flash = true;
  }

  generateTriangleVertices(x, y, z, r, g, b, xSize, ySize) {
    var vertices = [];

    var vertex0 = new Vertex(x - 1 * xSize, y - .2 * ySize, z, r, g, b);
    var vertex1 = new Vertex(x + 1 * xSize, y - .2 * ySize, z, r, g, b);
    var vertex2 = new Vertex(x - 1 * xSize, y + .2 * ySize, z, r, g, b);
    var vertex3 = new Vertex(x + 1 * xSize, y + .2 * ySize, z, r, g, b);

    //left bottom
    vertices.push(vertex0);
    //right bottom
    vertices.push(vertex1);
    //left top
    vertices.push(vertex2);
    //right bottom
    vertices.push(vertex1);
    //left top
    vertices.push(vertex2);
    //right top
    vertices.push(vertex3);

    return vertices;
  }

  render() {
    if (this.jump == true) {
      this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
      this.jumping += 1;
    }

    if (this.jumping >= this.jumpDuration) {
      this.jump = false;
    }

    if (this.jumping != 0 && this.jump == false) {
      this.modelMatrix = this.modelMatrix.multiply(this.negTranslationMatrix);
      this.jumping -= 1;
    }

    if (this.flash == true) {
      if (this.flashTimer == 0) {
        this.flashData[0] = this.data[3];
        this.flashData[1] = this.data[4];
        this.flashData[2] = this.data[5];
      }
      for (var i = 0; i < this.data.length; i += 9) {
        this.data[i + 3] = 1-this.flashData[0];
        this.data[i + 4] = 1-this.flashData[1];
        this.data[i + 5] = 1-this.flashData[2];
      }
      this.flashTimer += 1;
    }

    if (this.flashTimer == 10) {
      this.flash = false;
      this.flashTimer = 0;
      for (var i = 0; i < this.data.length; i += 9) {
        this.data[i + 3] = 1 - this.data[i+3];
        this.data[i + 4] = 1 - this.data[i+4];
        this.data[i + 5] = 1 - this.data[i+5];
      }
    }

    if (this.xSize != 1.0 && this.xSize != 0.1) {
      this.modelMatrix = this.modelMatrix.multiply(this.moveMatrix);
    }


    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);

  }
}
